import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { trips } from '@/lib/schema';
import { syncClerkUser } from '@/lib/user-sync';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  try {
    const result = await db.select()
      .from(trips)
      .where(eq(trips.userId, userId));
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();
  
  try {
    // First ensure user exists
    await syncClerkUser({ 
      id: data.userId,
      primaryEmailAddress: { emailAddress: data.email || '' },
      fullName: data.name || ''
    });

    const result = await db.insert(trips)
      .values(data)
      .returning();
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}