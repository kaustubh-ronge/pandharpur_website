"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

/**
 * Logs a Kirtankar inquiry from an authenticated user
 * @param {Object} inquiryData - Contains name, phone, eventDate, eventType, and kirtankarSlug
 * @returns {Object} Success status
 */
export async function logKirtankarInquiry(inquiryData) {
  try {
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
    }

    await db.kirtankarLead.create({
      data: {
        userName: inquiryData.name,
        userPhone: inquiryData.phone,
        actionType: "whatsapp_inquiry",
        entityId: inquiryData.kirtankarSlug,
        entityType: "kirtankar",
        userId: user.id,
      },
    });

    await db.kirtankarInquiry.create({
      data: {
        userName: inquiryData.name,
        userPhone: inquiryData.phone,
        eventDate: inquiryData.eventDate,
        eventType: inquiryData.eventType,
        kirtankarSlug: inquiryData.kirtankarSlug,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error during inquiry logging." };
  }
}

/**
 * Logs a details view event for a Kirtankar (anonymous users allowed)
 * @param {string} entitySlug - Kirtankar slug identifier
 * @returns {Object} Success status
 */
export async function logKirtankarDetailsView(entitySlug) {
  if (!entitySlug) {
    return { success: false, error: "Kirtankar slug is required." };
  }

  try {
    const user = await checkUser();

    await db.kirtankarLead.create({
      data: {
        userName: user ? user.name : "Anonymous",
        userPhone: "N/A",
        actionType: "details_view",
        entityId: entitySlug,
        entityType: "kirtankar",
        userId: user ? user.id : null,
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
