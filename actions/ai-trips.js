
// In actions/ai-trips.js
"use server";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";

export async function generateAiTrip(formData) {
  console.log("\n--- [ACTION: generateAiTrip] Received a new request ---");
  try {
    console.log("[ACTION: generateAiTrip] Step 1: Checking user...");
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");
    console.log(
      `[ACTION: generateAiTrip] Step 1 SUCCESS: User authenticated (ID: ${user.id})`
    );

    console.log(
      "[ACTION: generateAiTrip] Step 2: Checking for GEMINI_API_KEY..."
    );
    if (!process.env.GEMINI_API_KEY)
      throw new Error("CRITICAL: GEMINI_API_KEY is not configured.");
    console.log(
      "[ACTION: generateAiTrip] Step 2 SUCCESS: GEMINI_API_KEY found."
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { prompt, duration, people, budget } = formData;
    const detailedPrompt = `
      You are a world-class travel expert for Pandharpur, India. Create a hyper-detailed, step-by-step itinerary.
      User Request: "${prompt}".
      Parameters: Duration: ${duration} days, People: ${people}, Budget: ${budget}.
      Generate a JSON object with this exact structure:
      {
        "title": "A creative title for the trip",
        "summary": "A 2-sentence summary.",
        "itinerary": [{
            "day": 1,
            "title": "Theme for the day",
            "activities": [{
                "time": "e.g., 08:00 AM - 10:00 AM",
                "locationName": "Name of the place",
                "fullAddress": "Full, real address for geocoding",
                "coordinates": { "lat": 17.6744, "lng": 75.3235 },
                "description": "A detailed description.",
                "travelSuggestion": "Step-by-step directions FROM THE PREVIOUS LOCATION."
            }]
        }],
        "estimatedCost": { "total": 4300 },
        "travelTips": ["Tip 1", "Tip 2"]
      }
      CRITICAL: The ENTIRE output must be a single, valid JSON object. Provide accurate coordinates.
    `;

    console.log(
      "[ACTION: generateAiTrip] Step 3: Sending prompt to Gemini AI..."
    );
    const result = await model.generateContent(detailedPrompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const responseObject = JSON.parse(cleanedText);
    console.log(
      "[ACTION: generateAiTrip] Step 3 SUCCESS: Received and parsed AI response."
    );

    console.log("[ACTION: generateAiTrip] Step 4: Saving to database...");
    const newTrip = await db.aiTrip.create({
      data: { userId: user.id, prompt: formData, response: responseObject },
    });
    console.log(
      `[ACTION: generateAiTrip] Step 4 SUCCESS: Record created with ID: ${newTrip.id}`
    );

    console.log(
      "--- [ACTION: generateAiTrip] Request completed successfully ---\n"
    );
    return { success: true, trip: newTrip };
  } catch (error) {
    console.error("\n--- [ACTION: generateAiTrip] CRITICAL FAILURE ---");
    console.error(
      `[ACTION: generateAiTrip] The process failed. Error: ${error.message}`
    );
    console.error("----------------------------------------\n");
    return { success: false, error: error.message };
  }
}

export async function getAiTrips() {
  console.log("\n--- [ACTION: getAiTrips] Received a new request ---");
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    const trips = await db.aiTrip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, trips };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteAiTrip(id) {
  console.log(
    `\n--- [ACTION: deleteAiTrip] Received a new request for ID: ${id} ---`
  );
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    await db.aiTrip.delete({ where: { id, userId: user.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
