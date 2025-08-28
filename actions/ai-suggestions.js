

"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAIItenary(tripId, profile) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const prompt = `
      Create a detailed ${profile.preferences.pace}-paced ${profile.name} itinerary for Pandharpur 
      spanning ${profile.preferences.duration} days with the following preferences:
      - Focus: ${profile.preferences.focus}
      - Include rituals: ${profile.preferences.includeRituals}
      - Meal preferences: ${profile.preferences.mealPreferences}
      - Accommodation: ${profile.preferences.accommodation}
      
      Use only real locations from Pandharpur.
      
      Return ONLY the JSON in this format:
      {
        "itinerary": [
          {
            "day": 1,
            "date": "2025-08-27",
            "activities": [
              {
                "name": "Activity name",
                "type": "temple/food/cultural",
                "time": "HH:MM",
                "duration": "X hours",
                "location": {"name": "Location Name", "lat": 0, "lng": 0},
                "description": "Detailed description",
                "notes": "Special instructions"
              }
            ]
          }
        ],
        "summary": "Brief trip summary",
        "packingTips": ["List of items to pack"]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const parsedResponse = JSON.parse(cleanedText);

    const generatedEvents = parsedResponse.itinerary.flatMap(day =>
      day.activities.map(activity => ({
        ...activity,
        date: day.date,
        id: `ai-${Date.now()}-${Math.random()}`,
        isAutoPlanned: true
      }))
    );

    const updatedTrip = await db.trip.update({
        where: { id: tripId, userId: user.id },
        data: { itinerary: generatedEvents, updatedAt: new Date() }
    });

    // **FIXED SECTION**: Removed the 'generatedAt' field
    await db.aiSuggestion.upsert({
      where: { userId: user.id },
      update: { suggestions: parsedResponse }, // Corrected: `generatedAt` removed
      create: { userId: user.id, suggestions: parsedResponse } // Corrected: `generatedAt` removed
    });

    return updatedTrip;

  } catch (error) {
    console.error("Error generating AI itinerary:", error);
    throw new Error("Failed to generate AI itinerary.");
  }
}