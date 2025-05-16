
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export async function syncClerkUser(clerkUser) {
  try {
    // Check if user exists by clerkId
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.clerkId, clerkUser.id));
    
    if (existingUser.length === 0) {
      // Create new user record
      const newUser = {
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
    }
    
    return existingUser[0];
  } catch (error) {
    console.error('Error syncing Clerk user:', error);
    throw error;
  }
}