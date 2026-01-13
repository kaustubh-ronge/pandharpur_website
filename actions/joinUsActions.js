"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

/**
 * Saves a "Join Us" inquiry and links it to the logged-in user, if available
 * @param {Object} data - Contains name, phone, entityType, and message
 * @returns {Object} Success status
 */
export async function createJoinUsInquiry(data) {
  const { name, phone, entityType, message } = data;

  if (!name || !phone || !entityType || !message) {
    return { success: false, error: "Missing required fields." };
  }

  try {
    const user = await checkUser();

    await db.joinUsInquiry.create({
      data: {
        name,
        phone,
        entityType,
        message,
        userId: user ? user.id : null,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error." };
  }
}