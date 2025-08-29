"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Predefined Pandharpur locations with proper coordinates
const pandharpurLocations = {
  "Shri Vitthal Rukmini Temple": { lat: 17.6792, lng: 75.3319 },
  "Sant Tukaram Maharaj Temple": { lat: 17.6815, lng: 75.3289 },
  "Pandharpur Pilgrim Center": { lat: 17.6749, lng: 75.3276 },
  "Chandrabhaga River": { lat: 17.6860, lng: 75.3220 },
  "Pandharinath Temple": { lat: 17.6785, lng: 75.3302 },
  "Vithoba Temple": { lat: 17.6795, lng: 75.3310 },
  "Pandharpur Market": { lat: 17.6758, lng: 75.3294 }
};

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
     
      Use only real locations from Pandharpur. For each activity, include exact location names from this list: 
      ${Object.keys(pandharpurLocations).join(", ")}
     
      Return ONLY the JSON in this format:
      {
        "itinerary": [
          {
            "day": 1,
            "date": "${new Date().toISOString().split('T')[0]}",
            "activities": [
              {
                "name": "Activity name",
                "type": "temple/food/cultural/ritual",
                "time": "HH:MM",
                "duration": "X hours",
                "location": {"name": "Exact Location Name", "lat": 0, "lng": 0},
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

    // Process activities to ensure they have proper location data
    const processedItinerary = parsedResponse.itinerary.map(day => {
      return {
        ...day,
        activities: day.activities.map(activity => {
          // Match location name with our predefined locations
          let locationData = { name: activity.location?.name || "Pandharpur", lat: 17.6792, lng: 75.3319 };
          
          // Find matching location
          for (const [name, coords] of Object.entries(pandharpurLocations)) {
            if (activity.location?.name && activity.location.name.includes(name)) {
              locationData = { name, ...coords };
              break;
            }
          }
          
          return {
            ...activity,
            location: locationData,
            date: day.date,
            id: `ai-${Date.now()}-${Math.random()}`,
            isAutoPlanned: true
          };
        })
      };
    });

    const generatedEvents = processedItinerary.flatMap(day => day.activities);

    const updatedTrip = await db.trip.update({
      where: { id: tripId, userId: user.id },
      data: { 
        itinerary: generatedEvents, 
        updatedAt: new Date(),
        isAIGenerated: true
      }
    });

    await db.aiSuggestion.upsert({
      where: { userId: user.id },
      update: { suggestions: parsedResponse },
      create: { userId: user.id, suggestions: parsedResponse }
    });

    return updatedTrip;

  } catch (error) {
    console.error("Error generating AI itinerary:", error);
    throw new Error("Failed to generate AI itinerary.");
  }
}