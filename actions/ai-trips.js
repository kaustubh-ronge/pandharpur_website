"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

/**
 * Generates an AI-powered trip itinerary based on user preferences
 * @param {Object} formData - Contains prompt, duration, people, and budget
 * @returns {Object} Success status and generated trip data
 */
export async function generateAiTrip(formData) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      throw new Error("CRITICAL: GEMINI_API_KEY is not configured.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
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

    const result = await model.generateContent(detailedPrompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const responseObject = JSON.parse(cleanedText);

    const newTrip = await db.aiTrip.create({
      data: { userId: user.id, prompt: formData, response: responseObject },
    });

    return { success: true, trip: newTrip };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Retrieves all AI-generated trips for the authenticated user
 * @returns {Object} Success status and array of trips
 */
export async function getAiTrips() {
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

/**
 * Deletes an AI-generated trip by ID
 * @param {string} id - Trip ID to delete
 * @returns {Object} Success status
 */
export async function deleteAiTrip(id) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    await db.aiTrip.delete({ where: { id, userId: user.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
