
// // import { db } from './db';
// // import { users } from './schema';
// // import { eq } from 'drizzle-orm';

// // export async function syncClerkUser(clerkUser) {
// //   try {
// //     // Check if user exists by clerkId
// //     const existingUser = await db.select()
// //       .from(users)
// //       .where(eq(users.clerkId, clerkUser.id));
    
// //     if (existingUser.length === 0) {
// //       // Create new user record
// //       const newUser = {
// //         clerkId: clerkUser.id,
// //         email: clerkUser.primaryEmailAddress?.emailAddress || '',
// //         name: clerkUser.fullName || '',
// //         createdAt: new Date(),
// //         updatedAt: new Date()
// //       };
      
// //       const result = await db.insert(users)
// //         .values(newUser)
// //         .returning();
      
// //       return result[0];
// //     }
    
// //     return existingUser[0];
// //   } catch (error) {
// //     console.error('Error syncing Clerk user:', error);
// //     throw error;
// //   }
// // }


import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid'; // Add this import

// export async function syncClerkUser(clerkUser) {
//   try {
//     // Check if user exists by clerkId
//     const existingUser = await db.select()
//       .from(users)
//       .where(eq(users.clerkId, clerkUser.id));
    
//     if (existingUser.length === 0) {
//       // Create new user record
//       const newUser = {
//         id: uuidv4(), // Generate a UUID for the primary key
//         clerkId: clerkUser.id,
//         email: clerkUser.primaryEmailAddress?.emailAddress || '',
//         name: clerkUser.fullName || '',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       };
      
//       const result = await db.insert(users)
//         .values(newUser)
//         .returning();
      
//       return result[0];
//     }
    
//     return existingUser[0];
//   } catch (error) {
//     console.error('Error syncing Clerk user:', error);
//     throw error;
//   }
// }



export async function syncClerkUser(clerkUser) {
  try {
    // First try to find by clerkId
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.clerkId, clerkUser.id));
    
    if (existingUser.length > 0) {
      return existingUser[0];
    }

    // If not found, try to find by email
    if (clerkUser.primaryEmailAddress?.emailAddress) {
      const emailUser = await db.select()
        .from(users)
        .where(eq(users.email, clerkUser.primaryEmailAddress.emailAddress));
      
      if (emailUser.length > 0) {
        // Update with clerkId if found by email
        await db.update(users)
          .set({ clerkId: clerkUser.id, updatedAt: new Date() })
          .where(eq(users.id, emailUser[0].id));
        return emailUser[0];
      }
    }

    // Create new user if not found
    const newUser = {
      id: uuidv4(),
      clerkId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      name: clerkUser.fullName || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.insert(users)
      .values(newUser)
      .returning();
    
    return result[0];
  } catch (error) {
    console.error('Error syncing Clerk user:', error);
    throw error;
  }
}