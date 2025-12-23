'use server';

import { checkUser } from '@/lib/checkUser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/prisma';

// --- Configuration ---
if (!process.env.GEMINI_API_KEY) {
  throw new Error('CRITICAL: GEMINI_API_KEY is not configured.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// UPDATED: Using the model version you requested
const MODEL_NAME = 'gemini-2.5-flash';

const BIG_SYSTEM_PROMPT = `
[START PROMPT]
# I. CORE IDENTITY & PERSONA
You are "Pandhari Mitra," an AI-powered virtual guide for the holy city of Pandharpur. Your persona is Knowledgeable, Wise, Calm, Empathetic, Modern, and Tech-Savvy. You are perfectly fluent in Marathi, English, and Hindi.

# II. CONVERSATIONAL RULES
- **DO NOT** introduce yourself in every message. Only say who you are if specifically asked.
- Be concise and direct.
- If asked about "Darshan", provide general queue info unless you have live data.
- Use Markdown for formatting (bold, bullet points).

# III. KNOWLEDGE DOMAIN & CAPABILITIES (20 Features)
You are programmed to perform the following 20 key functions seamlessly:
1.  **Hyper-Personalized Itinerary Planner:** Create detailed schedules based on interests, duration, budget, age, and mobility.
2.  **Live Data Integration:** Provide real-time darshan queues, aarti timings, weather, and events.
3.  **Advanced Multilingual Support:** Converse fluently in Marathi, Hindi, and English.
4.  **Rich Media Integration:** Respond with maps, images, videos, and audio clips.
5.  **Accommodation & Travel Assistant:** Help find and book hotels, dharamshalas, and transport.
6.  **"Spiritual Companion" Mode:** Share daily verses, stories of saints (Dnyaneshwar, Tukaram), and explain spiritual concepts.
7.  **Culinary & Shopping Advisor:** Recommend local cuisine, eateries, and authentic shops.
8.  **Emergency & Safety Protocol:** Provide instant access to emergency contacts and safety tips.
9.  **Accessibility Advisor:** Offer information for elderly visitors and people with disabilities (ramps, facilities, crowd levels).
10. **Gamified "City Explorer" Challenge:** Create an interactive scavenger hunt to guide users through landmarks.
11. **Seasonal "Wari" Pilgrimage Guide:** A dedicated mode during the Wari season with live Palkhi tracking and Varkari tips.
12. **Cultural Etiquette Guide:** Inform visitors about temple dress codes, do's and don'ts, and local customs.
13. **Session Memory & Context Awareness:** Remember the conversation's context within a session.
14. **Community Insights Hub:** Pull and display curated tips and reviews from other travelers.
15. **Intelligent Feedback Collector:** Proactively ask for feedback to improve.
16. **Offline Content Suggestion:** Recommend detailed articles and blogs on the main website.
17. **Deep Google Maps Integration:** Provide embedded maps and multi-modal directions (walking, auto-rickshaw).
18. **Real-time Phrase Translator:** Translate common tourist phrases into Marathi upon request (e.g., 'How do I ask for water?').
19. **Festival Deep-Dive Mode:** When a major festival is near, provide hyper-specific details about special arrangements and schedules.
20. **Personalized Preference Profile:** For logged-in users, learn and save preferences like dietary restrictions or specific interests to tailor all future recommendations.

# IV. CONSTRAINTS & SAFETY
- Remain neutral on religious matters. Do not ask for or store PII. Stay on the topic of Pandharpur.
[END PROMPT]
`;

const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
  systemInstruction: BIG_SYSTEM_PROMPT,
});

// --- 1. Fetch Chat History (Sidebar) ---
export async function getUserSessions(guestId = null) {
  try {
    const user = await checkUser();
    const queryOptions = {
      orderBy: { updatedAt: 'desc' },
      take: 50,
      select: { 
        id: true, 
        updatedAt: true, 
        title: true, 
        messages: { take: 1, orderBy: { createdAt: 'asc' }, select: { content: true } } 
      }
    };

    let sessions = [];
    if (user) {
      sessions = await db.chatSession.findMany({ where: { userId: user.id }, ...queryOptions });
    } else {
      if (!guestId) return { success: false, sessions: [] };
      sessions = await db.chatSession.findMany({ where: { guestId }, ...queryOptions });
    }

    const formatted = sessions.map(s => {
       let displayTitle = s.title;
       if (!displayTitle) {
           const firstMsg = s.messages[0]?.content || "New Conversation";
           displayTitle = firstMsg.length > 30 ? firstMsg.substring(0, 30) + "..." : firstMsg;
       }
       return { id: s.id, date: s.updatedAt, title: displayTitle };
    });

    return { success: true, sessions: formatted };
  } catch (error) {
    return { success: false, sessions: [] };
  }
}

// --- 2. Get Single Chat Session ---
export async function getSpecificSession(sessionId) {
  try {
    const user = await checkUser();
    const session = await db.chatSession.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: 'asc' }, take: 100 } },
    });

    if (!session) return { success: false, error: "Not found" };
    if (user && session.userId !== user.id) return { success: false, error: "Unauthorized" };

    return { success: true, session, messages: session.messages };
  } catch (error) {
     return { success: false, error: error.message };
  }
}

// --- 3. Create New Session ---
export async function createNewChatSession(guestId = null) {
  try {
    const user = await checkUser();
    const data = user ? { userId: user.id } : { guestId };
    if (!user && !guestId) throw new Error("ID missing");
    
    const session = await db.chatSession.create({ data });
    return { success: true, session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// --- 4. Delete Session ---
export async function deleteChatSession(sessionId) {
  try {
    const user = await checkUser();
    const session = await db.chatSession.findUnique({ where: { id: sessionId } });
    
    if (!session) return { success: false, error: "Not found" };
    if (user && session.userId !== user.id) return { success: false, error: "Unauthorized" };

    await db.chatSession.delete({ where: { id: sessionId } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// --- 5. Rename Session ---
export async function updateChatSessionTitle(sessionId, newTitle) {
  try {
    const user = await checkUser();
    const session = await db.chatSession.findUnique({ where: { id: sessionId } });
    if (!session || (user && session.userId !== user.id)) return { success: false, error: "Unauthorized" };

    await db.chatSession.update({
      where: { id: sessionId },
      data: { title: newTitle }
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// --- 6. Send Message ---
export async function sendMessage(sessionId, userMessage, language = 'english') {
  try {
    if (!sessionId || !userMessage) throw new Error("Missing data");

    await db.chatMessage.create({
      data: { chatSessionId: sessionId, role: 'user', content: userMessage },
    });

    const recentHistory = await db.chatMessage.findMany({
      where: { chatSessionId: sessionId },
      orderBy: { createdAt: 'asc' },
      take: -30,
    });

    const historyForAI = recentHistory.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({ history: historyForAI });
    const finalPrompt = `${userMessage}\n\n[SYSTEM: Respond in ${language}. Concise.]`;
    
    const result = await chat.sendMessage(finalPrompt);
    const aiResponseText = result.response.text();
    
    await db.chatMessage.create({
        data: { chatSessionId: sessionId, role: 'model', content: aiResponseText }
    });

    await db.chatSession.update({
        where: { id: sessionId },
        data: { updatedAt: new Date() }
    });

    return { success: true, aiMessage: { role: 'model', content: aiResponseText, createdAt: new Date() } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}