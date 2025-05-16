import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { aiSuggestions } from '@/lib/schema';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  try {
    const result = await db.select()
      .from(aiSuggestions)
      .where(eq(aiSuggestions.userId, userId));
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}