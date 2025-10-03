

'use server';

import { checkUser } from '@/lib/checkUser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/prisma';

// --- Master Prompt & AI Configuration ---

if (!process.env.GEMINI_API_KEY) {
  throw new Error('CRITICAL: GEMINI_API_KEY is not configured.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const BIG_SYSTEM_PROMPT = `
[START PROMPT]
# I. CORE IDENTITY & PERSONA
You are "Pandhari Mitra," an AI-powered virtual guide for the holy city of Pandharpur. Your persona is Knowledgeable, Wise, Calm, Empathetic, Modern, and Tech-Savvy. You are perfectly fluent in Marathi, English, and Hindi.

# II. KNOWLEDGE DOMAIN & CAPABILITIES (20 Features)
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

# III. CONVERSATIONAL RULES & BEHAVIOR
- Initiate gracefully. Be adaptive and let the user lead. Use interactive elements like buttons when appropriate. If you don't know an answer, say so politely.

# IV. CONSTRAINTS & SAFETY
- Remain neutral on religious matters. Do not ask for or store PII. Stay on the topic of Pandharpur.
[END PROMPT]
`;

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-latest',
  systemInstruction: BIG_SYSTEM_PROMPT,
});

// --- Server Actions ---

export async function getOrCreateChatSession(guestId = null) {
  console.log('\n--- [ACTION: getOrCreateChatSession] Received a new request ---');
  try {
    console.log('[ACTION: getOrCreateChatSession] Step 1: Checking user authentication...');
    const user = await checkUser();

    if (user) {
      console.log(`[ACTION: getOrCreateChatSession] Step 1 SUCCESS: User authenticated (ID: ${user.id})`);
      console.log('[ACTION: getOrCreateChatSession] Step 2: Finding existing session for user...');
      
      let session = await db.chatSession.findFirst({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      });

      if (session) {
        console.log(`[ACTION: getOrCreateChatSession] Step 2 SUCCESS: Found session ${session.id}`);
        return { success: true, session, messages: session.messages };
      }

      console.log('[ACTION: getOrCreateChatSession] Step 2 INFO: No session found. Creating a new one...');
      session = await db.chatSession.create({
        data: { userId: user.id },
        include: { messages: true },
      });
      console.log(`[ACTION: getOrCreateChatSession] Step 3 SUCCESS: Created new session ${session.id}`);
      return { success: true, session, messages: [] };

    } else {
      console.log('[ACTION: getOrCreateChatSession] Step 1 INFO: No authenticated user found. Checking for guestId...');
      if (!guestId) throw new Error("Guest session requires a guestId.");

      console.log(`[ACTION: getOrCreateChatSession] Step 2: Finding existing session for guestId: ${guestId}`);
      let session = await db.chatSession.findUnique({
        where: { guestId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      });
      
      if (session) {
        console.log(`[ACTION: getOrCreateChatSession] Step 2 SUCCESS: Found guest session ${session.id}`);
        return { success: true, session, messages: session.messages };
      }
      
      console.log('[ACTION: getOrCreateChatSession] Step 2 INFO: No guest session found. Creating a new one...');
      session = await db.chatSession.create({
        data: { guestId },
        include: { messages: true },
      });
      console.log(`[ACTION: getOrCreateChatSession] Step 3 SUCCESS: Created new guest session ${session.id}`);
      return { success: true, session, messages: [] };
    }

  } catch (error) {
    console.error("\n--- [ACTION: getOrCreateChatSession] CRITICAL FAILURE ---");
    console.error(`[ACTION: getOrCreateChatSession] The process failed. Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

export async function sendMessage(sessionId, userMessage, language = 'english') {
  console.log(`\n--- [ACTION: sendMessage] Received new message for session ${sessionId} ---`);
  try {
    if (!sessionId || !userMessage) throw new Error("Session ID and message are required.");
    
    console.log('[ACTION: sendMessage] Step 1: Verifying session and user...');
    const user = await checkUser();
    const session = await db.chatSession.findUnique({ where: { id: sessionId } });

    if (!session) throw new Error("Chat session not found.");
    if (user && session.userId && user.id !== session.userId) throw new Error("Unauthorized access to chat session.");
    console.log('[ACTION: sendMessage] Step 1 SUCCESS: Session and user verified.');
    
    console.log('[ACTION: sendMessage] Step 2: Saving user message to database...');
    await db.chatMessage.create({
      data: {
        chatSessionId: sessionId,
        role: 'user',
        content: userMessage,
      },
    });
    console.log('[ACTION: sendMessage] Step 2 SUCCESS: User message saved.');
    
    console.log('[ACTION: sendMessage] Step 3: Fetching full conversation history...');
    const fullHistoryRaw = await db.chatMessage.findMany({
      where: { chatSessionId: sessionId },
      orderBy: { createdAt: 'asc' },
    });
    
    let chatHistoryForAPI = fullHistoryRaw.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));
    console.log(`[ACTION: sendMessage] Step 3 SUCCESS: Fetched ${chatHistoryForAPI.length} messages for context.`);

    const languageInstruction = {
        role: 'user',
        parts: [{ text: `CRITICAL INSTRUCTION: You MUST respond in the ${language} language.` }]
    };
    chatHistoryForAPI.unshift(languageInstruction);

    console.log('[ACTION: sendMessage] Step 4: Sending context to Gemini AI...');
    const chat = model.startChat({ history: chatHistoryForAPI.slice(0, -1) });
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const aiResponseText = response.text();
    console.log('[ACTION: sendMessage] Step 4 SUCCESS: Received AI response.');
    
    console.log('[ACTION: sendMessage] Step 5: Saving AI response to database...');
    const aiMessage = await db.chatMessage.create({
        data: {
            chatSessionId: sessionId,
            role: 'model',
            content: aiResponseText,
        }
    });
    console.log('[ACTION: sendMessage] Step 5 SUCCESS: AI message saved.');

    return { success: true, aiMessage };

  } catch (error) {
    console.error("\n--- [ACTION: sendMessage] CRITICAL FAILURE ---");
    console.error(`[ACTION: sendMessage] The process failed. Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

export async function createNewChatSession(guestId = null) {
  console.log('\n--- [ACTION: createNewChatSession] Received a new request ---');
  try {
    const user = await checkUser();
    let session;

    if (user) {
      console.log(`[ACTION: createNewChatSession] Creating new session for user: ${user.id}`);
      session = await db.chatSession.create({ data: { userId: user.id } });
    } else {
      if (!guestId) throw new Error("Guest session requires a guestId.");
      console.log(`[ACTION: createNewChatSession] Creating new session for guest: ${guestId}`);
      session = await db.chatSession.create({ data: { guestId } });
    }
    
    console.log(`[ACTION: createNewChatSession] SUCCESS: Created new session ${session.id}`);
    return { success: true, session };

  } catch (error) {
    console.error("\n--- [ACTION: createNewChatSession] CRITICAL FAILURE ---");
    console.error(`[ACTION: createNewChatSession] The process failed. Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

export async function deleteChatSession(sessionId) {
  console.log(`\n--- [ACTION: deleteChatSession] Request for ID: ${sessionId} ---`);
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");

    const session = await db.chatSession.findUnique({ where: { id: sessionId }});
    if (!session || session.userId !== user.id) throw new Error("Session not found or permission denied.");
    
    await db.chatSession.delete({ where: { id: sessionId } });
    console.log(`[ACTION: deleteChatSession] SUCCESS: Session ${sessionId} deleted.`);
    return { success: true };
  } catch (error) {
    console.error("\n--- [ACTION: deleteChatSession] CRITICAL FAILURE ---");
    console.error(`[ACTION: deleteChatSession] The process failed. Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}