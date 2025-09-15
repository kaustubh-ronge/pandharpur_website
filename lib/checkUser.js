
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();

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
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.emailAddresses[0].emailAddress,
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
