// lib/checkUser.js

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches the current Clerk user with a few short retries to avoid
 * occasional nulls immediately after sign-in.
 */
async function getStableCurrentUser() {
  const attempt = async () => {
    const user = await currentUser();
    if (user) return user;

    // Fallback: pull from auth() when currentUser is temporarily null.
    const { userId } = auth();
    if (!userId) return null;
    return await currentUser();
  };

  const retries = [0, 120, 240]; // total ~360ms backoff
  for (const delay of retries) {
    if (delay) await sleep(delay);
    const user = await attempt();
    if (user) return user;
  }
  return null;
}

export const checkUser = async () => {
  try {
    const user = await getStableCurrentUser();

    if (!user) {
      return null;
    }

    // Try to find the user in DB
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Create a new user if not found
    const primaryEmail =
      user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress || user.emailAddresses?.[0]?.emailAddress;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: primaryEmail || "",
        imageUrl: user.imageUrl,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    // On /studio or other public routes, just return null
    return null;
  }
};
