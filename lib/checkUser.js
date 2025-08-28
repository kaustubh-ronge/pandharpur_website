// // lib/checkUser.js
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "./prisma"; // Your Prisma client

// export const checkUser = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return null;
//   }

//   try {
//     // Check if user exists using Prisma
//     const loggedInUser = await db.user.findUnique({
//       where: {
//         clerkId: user.id, // Using Prisma syntax
//       },
//     });

//     if (loggedInUser) {
//       return loggedInUser;
//     }

//     // Create new user with Prisma
//     const name = `${user.firstName} ${user.lastName}`;
    
//     const newUser = await db.user.create({
//       data: {
//         clerkId: user.id,
//         name,
//         imageUrl: user.imageUrl,
//         email: user.emailAddresses[0].emailAddress,
//       },
//     });

//     return newUser; // Prisma returns the object directly

//   } catch (error) {
//     console.log(error.message);
//     return null;
//   }
// };


import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    // Find user by the new 'clerkUserId' field
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Create a new user using the new 'clerkUserId' field
    // and including the new fields from the schema
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });

    return newUser;

  } catch (error) {
    console.error("Error in checkUser:", error);
    // Returning null or re-throwing the error can be decided based on desired app behavior
    return null; 
  }
};