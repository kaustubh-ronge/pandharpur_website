"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";
import { subscriptionSchema, paymentVerificationSchema } from "@/lib/schema";
import { formRateLimiter } from "@/lib/arcjet";
import { headers } from "next/headers";

export async function createSubscriptionOrder(formData) {
  try {
    // Arcjet Protection
    const decision = await formRateLimiter.protect({
      headers: await headers(),
    });

    if (decision.isDenied()) {
      return { success: false, error: "Payment request limit exceeded. Please try again later." };
    }

    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
    }

    const validation = subscriptionSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: "Invalid subscription data." };
    }

    const {
      planId,
      businessType,
      businessName,
      contactPersonName,
      contactPhone,
      contactEmail,
      city,
      listingSlug,
    } = validation.data;

    const plan = await db.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.isActive) {
      return { success: false, error: "Invalid subscription plan." };
    }

    // 1. Create a PENDING Subscription record first to log intent
    // This ensures that even if Razorpay fails, we have a record of the user's attempt.
    const subscription = await db.subscription.create({
      data: {
        userId: user.id,
        businessType,
        businessName,
        contactPersonName,
        contactPhone,
        contactEmail,
        city,
        listingSlug,
        planId: plan.id,
        status: "PENDING_PAYMENT",
      },
    });

    // 2. Create Razorpay order
    let order;
    try {
      const options = {
        amount: plan.priceInPaise,
        currency: "INR",
        payment_capture: 1,
        notes: {
          subscriptionId: subscription.id,
          planId,
          businessType,
          businessName,
        },
      };
      order = await razorpay.orders.create(options);
    } catch (rpError) {
      // If Razorpay fails, we mark the local record as failed
      await db.subscription.update({
        where: { id: subscription.id },
        data: { status: "PAYMENT_FAILED" }
      });
      throw rpError;
    }

    // 3. Update the record with the Razorpay Order ID
    await db.subscription.update({
      where: { id: subscription.id },
      data: { razorpayOrderId: order.id },
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      subscriptionId: subscription.id,
    };
  } catch (error) {
    return { success: false, error: "Failed to create order." };
  }
}

/**
 * Verify Razorpay signature and activate subscription.
 *
 * payload = {
 *   razorpay_order_id: string,
 *   razorpay_payment_id: string,
 *   razorpay_signature: string
 * }
 */
export async function verifyAndActivateSubscription(payload) {
  try {
    const validation = paymentVerificationSchema.safeParse(payload);
    if (!validation.success) {
      return { success: false, error: "Missing Razorpay payment details." };
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      validation.data;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return {
        success: false,
        error: "RAZORPAY_KEY_SECRET is not configured on the server.",
      };
    }

    const hmac = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    );
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const computedSignature = hmac.digest("hex");

    const isValid = computedSignature === razorpay_signature;

    if (!isValid) {
      await db.subscription.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: { status: "PAYMENT_FAILED" },
      });
      return { success: false, error: "Invalid payment signature." };
    }

    const updated = await db.$transaction(async (tx) => {
      const subscription = await tx.subscription.findFirst({
        where: { razorpayOrderId: razorpay_order_id },
        include: { plan: true },
      });

      if (!subscription) {
        throw new Error("Subscription not found.");
      }

      if (subscription.status === "ACTIVE") {
        return subscription; // Already active, idempotency
      }

      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(
        endDate.getMonth() + (subscription.plan?.durationMonths || 3)
      );

      return await tx.subscription.update({
        where: { id: subscription.id },
        data: {
          status: "ACTIVE",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          startDate,
          endDate,
        },
      });
    });

    return { success: true, subscription: updated };
  } catch (error) {
    return { success: false, error: "Verification failed." };
  }
}

/**
 * Get all subscriptions for the super-admin dashboard.
 */
export async function getAllSubscriptionsForAdmin() {
  const user = await checkUser();
  if (!user || !user.isSuperAdmin) {
    return { success: false, error: "Not authorized." };
  }

  const subscriptions = await db.subscription.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      plan: true,
      user: true,
    },
  });

  return { success: true, subscriptions };
}

/**
 * Mark a subscription as REVIEWED once you have published
 * the relevant listing in Sanity.
 */
export async function markSubscriptionReviewed(id) {
  const user = await checkUser();
  if (!user || !user.isSuperAdmin) {
    return { success: false, error: "Not authorized." };
  }

  try {
    const updated = await db.subscription.update({
      where: { id },
      data: { reviewStatus: "REVIEWED" },
    });
    return { success: true, subscription: updated };
  } catch (error) {
    return { success: false, error: "Update failed." };
  }
}


