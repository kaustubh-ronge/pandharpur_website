"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

// Action for the Kirtankar Inquiry Form
export async function logKirtankarInquiry(inquiryData) {
  try {
    // User must be authenticated to make an inquiry
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
    } // Log the master lead record

    await db.kirtankarLead.create({
      data: {
        userName: inquiryData.name,
        userPhone: inquiryData.phone,
        actionType: "whatsapp_inquiry",
        entityId: inquiryData.kirtankarSlug,
        entityType: "kirtankar",
        userId: user.id,
      },
    }); // Log the specific inquiry record

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
    console.error("Failed to log Kirtankar inquiry:", error);
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
        userId: user ? user.id : null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to log Kirtankar details view:", error);
    return {
      success: false,
      error: "Database error during details view logging.",
    };
  }
}
