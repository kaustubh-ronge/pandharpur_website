"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

/**
 * Create a Razorpay order for a given subscription plan
 * and a pending Subscription record.
 *
 * formData = {
 *   planId: string,
 *   businessType: "HOTEL" | "BHAKTANIWAS" | "RESTAURANT" | "TRAVEL",
 *   businessName: string,
 *   contactPersonName: string,
 *   contactPhone: string,
 *   contactEmail?: string,
 *   city?: string,
 *   listingSlug?: string
 * }
 */
export async function createSubscriptionOrder(formData) {
  try {
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
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
    } = formData || {};

    if (
      !planId ||
      !businessType ||
      !businessName ||
      !contactPersonName ||
      !contactPhone
    ) {
      return { success: false, error: "Missing required fields." };
    }

    const plan = await db.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.isActive) {
      return { success: false, error: "Invalid subscription plan." };
    }

    const amount = plan.priceInPaise;

    const options = {
      amount,
      currency: "INR",
      payment_capture: 1,
      notes: {
        planId,
        businessType,
        businessName,
        contactPersonName,
        contactPhone,
        contactEmail: contactEmail || "",
        city: city || "",
        listingSlug: listingSlug || "",
      },
    };

    const order = await razorpay.orders.create(options);

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
        razorpayOrderId: order.id,
      },
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      payload || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return { success: false, error: "Missing Razorpay payment details." };
    }

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

    const subscription = await db.subscription.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
      include: { plan: true },
    });

    if (!subscription) {
      return { success: false, error: "Subscription not found." };
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + (subscription.plan?.durationMonths || 3));

    const updated = await db.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "ACTIVE",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        startDate,
        endDate,
      },
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


