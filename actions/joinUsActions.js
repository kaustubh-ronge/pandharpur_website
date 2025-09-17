// FILE: /actions/joinUsActions.js
"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

/**
 * Saves a "Join Us" inquiry and links it to the logged-in user, if available.
 */
export async function createJoinUsInquiry(data) {
  const { name, phone, entityType, message } = data;

  // Basic validation to ensure data is present
  if (!name || !phone || !entityType || !message) {
    return { success: false, error: "Missing required fields." };
  }

  try {
    // Check for a logged-in user, but don't require one
    const user = await checkUser();

    // The only job is to create the record in the database
    await db.joinUsInquiry.create({
      data: {
        name,
        phone,
        entityType,
        message,
        // Link to the user's ID if they are logged in
        userId: user ? user.id : null,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating Join Us inquiry:", error);
    return { success: false, error: "Database error." };
  }
}