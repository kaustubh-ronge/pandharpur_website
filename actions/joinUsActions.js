// FILE: /actions/joinUsActions.js
"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { joinUsInquirySchema } from "@/lib/schema";
import { formRateLimiter } from "@/lib/arcjet";
import { headers } from "next/headers";

/**
 * Saves a "Join Us" inquiry and links it to the logged-in user, if available.
 */
export async function createJoinUsInquiry(data) {
  // Arcjet Protection
  const decision = await formRateLimiter.protect({
    headers: await headers(),
  });

  if (decision.isDenied()) {
    return { success: false, error: "Submission rate limit exceeded. Please try again later." };
  }

  // Validate input
  const validation = joinUsInquirySchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Invalid inquiry data provided." };
  }

  const { name, phone, entityType, message } = validation.data;

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
        userId: user?.id || null,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Database error." };
  }
}