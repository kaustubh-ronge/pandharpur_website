

// FILE: actions/leadActions.js
"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { inquiryLeadSchema, leadSchema } from "@/lib/schema";
import { formRateLimiter } from "@/lib/arcjet";
import { headers } from "next/headers";

// Action for the Inquiry Form
export async function logInquiryLead(leadData) {
  try {
    // Arcjet Protection
    const decision = await formRateLimiter.protect({
      headers: await headers(),
    });

    if (decision.isDenied()) {
      return { success: false, error: "Submission limit exceeded. Please try again later." };
    }

    // Validate input
    const validation = inquiryLeadSchema.safeParse(leadData);
    if (!validation.success) {
      return { success: false, error: "Invalid inquiry data." };
    }

    const validData = validation.data;

    // Ensure user exists in Prisma (linked to Clerk)
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
    }

    // Determine entity type and slug based on the data provided
    let entityType = validData.entityType || "hotel";
    let entityId = validData.hotelSlug || validData.bhaktaniwasSlug || validData.travelSlug;

    // --- IDEMPOTENCY CHECK ---
    // Prevent duplicate submissions within a short window (60 seconds)
    const recentInquiry = await db.inquiry.findFirst({
      where: {
        userPhone: validData.phone,
        OR: [
          { hotelSlug: validData.hotelSlug || undefined },
          { bhaktaniwasSlug: validData.bhaktaniwasSlug || undefined },
          { travelSlug: validData.travelSlug || undefined },
        ],
        createdAt: {
          gte: new Date(Date.now() - 60000), // Last 60 seconds
        },
      },
    });

    if (recentInquiry) {
      return { success: true, message: "Inquiry already logged." };
    }
    // -------------------------

    await db.$transaction(async (tx) => {
      // Write to the master Lead table
      await tx.lead.create({
        data: {
          userName: validData.name,
          userPhone: validData.phone,
          actionType: "whatsapp_inquiry_form",
          entityId: entityId,
          entityType: entityType,
          userId: user?.id,
        },
      });

      // Write to the clean Inquiry table
      await tx.inquiry.create({
        data: {
          userName: validData.name,
          userPhone: validData.phone,
          hotelSlug: validData.hotelSlug || null,
          bhaktaniwasSlug: validData.bhaktaniwasSlug || null,
          travelSlug: validData.travelSlug || null,
          userId: user?.id,
        },
      });
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error" };
  }
}

// Action for the "Details" button click
export async function logDetailsView(entitySlug, entityType = "hotel") {
  if (!entitySlug) {
    return { success: false, error: "Entity slug is required." };
  }

  try {
    // Ensure user exists in Prisma (optional for details)
    const user = await checkUser();

    // Idempotency: Ignore duplicate view logs for the same entity by the same user/anon within 10s
    const recentView = await db.lead.findFirst({
      where: {
        entityId: entitySlug,
        entityType: entityType,
        actionType: "details_view",
        userId: user?.id || null,
        createdAt: { gte: new Date(Date.now() - 10000) },
      }
    });

    if (recentView) return { success: true };

    await db.lead.create({
      data: {
        userName: user ? user.name : "Anonymous",
        userPhone: "N/A",
        actionType: "details_view",
        entityId: entitySlug,
        entityType: entityType,
        userId: user ? user.id : null, // ✅ nullable FK works for Lead
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error" };
  }
}