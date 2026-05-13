"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { kirtankarInquirySchema } from "@/lib/schema";

// Action for the Kirtankar Inquiry Form
export async function logKirtankarInquiry(inquiryData) {
  try {
    // Validate input
    const validation = kirtankarInquirySchema.safeParse(inquiryData);
    if (!validation.success) {
      return { success: false, error: "Invalid inquiry data." };
    }

    const validData = validation.data;

    // User must be authenticated to make an inquiry
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
    }

    // --- IDEMPOTENCY CHECK ---
    const recentInquiry = await db.kirtankarInquiry.findFirst({
      where: {
        userPhone: validData.phone,
        kirtankarSlug: validData.kirtankarSlug,
        createdAt: { gte: new Date(Date.now() - 60000) }, // 60s
      }
    });

    if (recentInquiry) return { success: true, message: "Already logged." };
    // -------------------------

    await db.$transaction(async (tx) => {
      // Log the master lead record
      await tx.kirtankarLead.create({
        data: {
          userName: validData.name,
          userPhone: validData.phone,
          actionType: "whatsapp_inquiry",
          entityId: validData.kirtankarSlug,
          entityType: "kirtankar",
          userId: user?.id,
        },
      });

      // Log the specific inquiry record
      await tx.kirtankarInquiry.create({
        data: {
          userName: validData.name,
          userPhone: validData.phone,
          eventDate: validData.eventDate,
          eventType: validData.eventType,
          kirtankarSlug: validData.kirtankarSlug,
          userId: user?.id,
        },
      });
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error during inquiry logging." };
  }
}

// Action for the "Details" button click on a Kirtankar card
export async function logKirtankarDetailsView(entitySlug) {
  if (!entitySlug) {
    return { success: false, error: "Kirtankar slug is required." };
  }

  try {
    // User can be anonymous for viewing details
    const user = await checkUser();

    await db.kirtankarLead.create({
      data: {
        userName: user ? user.name : "Anonymous",
        userPhone: "N/A",
        actionType: "details_view",
        entityId: entitySlug,
        entityType: "kirtankar",
        userId: user?.id || null,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Database error during details view logging.",
    };
  }
}
