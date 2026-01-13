import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches the current Clerk user with retries to handle occasional nulls immediately after sign-in
 * @returns {Promise<Object|null>} Clerk user object or null
 */
async function getStableCurrentUser() {
  const attempt = async () => {
    const user = await currentUser();
    if (user) return user;

    const { userId } = auth();
    if (!userId) return null;
    return await currentUser();
  };

  const retries = [0, 120, 240];
  for (const delay of retries) {
    if (delay) await sleep(delay);
    const user = await attempt();
    if (user) return user;
  }
  return null;
}

/**
 * Checks and syncs the current Clerk user with the database
 * Creates a new user record if one doesn't exist
 * @returns {Promise<Object|null>} Database user object or null if not authenticated
 */
export const checkUser = async () => {
  try {
    const user = await getStableCurrentUser();

    if (!user) {
      return null;
    }

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

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
    return null;
  }
};
