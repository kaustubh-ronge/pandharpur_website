"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

/**
 * Logs an inquiry lead for hotels, bhaktaniwas, or travel options
 * @param {Object} leadData - Contains name, phone, entityType, and entity slugs
 * @returns {Object} Success status
 */
export async function logInquiryLead(leadData) {
  try {
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
    }

    const entityType = leadData.entityType || "hotel";
    const entityId = leadData.hotelSlug || leadData.bhaktaniwasSlug || leadData.travelSlug;

    await db.lead.create({
      data: {
        userName: leadData.name,
        userPhone: leadData.phone,
        actionType: "whatsapp_inquiry_form",
        entityId: entityId,
        entityType: entityType,
        userId: user.id,
      },
    });

    await db.inquiry.create({
      data: {
        userName: leadData.name,
        userPhone: leadData.phone,
        hotelSlug: leadData.hotelSlug || null,
        bhaktaniwasSlug: leadData.bhaktaniwasSlug || null,
        travelSlug: leadData.travelSlug || null,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error" };
  }
}

/**
 * Logs a details view event for an entity (anonymous users allowed)
 * @param {string} entitySlug - Entity slug identifier
 * @param {string} entityType - Type of entity (default: "hotel")
 * @returns {Object} Success status
 */
export async function logDetailsView(entitySlug, entityType = "hotel") {
  if (!entitySlug) {
    return { success: false, error: "Entity slug is required." };
  }

  try {
    const user = await checkUser();

    await db.lead.create({
      data: {
        userName: user ? user.name : "Anonymous",
        userPhone: "N/A",
        actionType: "details_view",
        entityId: entitySlug,
        entityType: entityType,
        userId: user ? user.id : null,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error" };
  }
}