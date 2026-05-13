
"use server";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";
import { aiRouteSchema } from "@/lib/schema";
import { aiRateLimiter } from "@/lib/arcjet";
import { headers } from "next/headers";

export async function generateAiRoute(formData) {
  try {
    // Arcjet Protection
    const decision = await aiRateLimiter.protect({
      headers: await headers(),
    });

    if (decision.isDenied()) {
      return { success: false, error: "Security layer blocked this request (Rate limit or Bot)." };
    }

    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");

    // Validate input
    const validation = aiRouteSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: "Invalid location provided." };
    }

    const { startLocation } = validation.data;

    if (!process.env.GEMINI_API_KEY)
      throw new Error("CRITICAL: GEMINI_API_KEY is not configured.");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const detailedPrompt = `
      You are a logistics and travel expert. A user wants to travel from "${startLocation.replace(/"/g, '')}" to "Pandharpur, Maharashtra, India".
      Provide at least 5 distinct routes using different transportation methods (Car, Train, Plane).

      Generate a JSON object with this exact structure:
      {
        "routes": [{
          "routeName": "e.g., Self-Drive via NH 65",
          "transportMethod": "Car | Train | Plane | Multi-modal",
          "distance": "e.g., 210 km",
          "duration": "e.g., 4-5 hours",
          "estimatedCost": "e.g., ₹2500 (fuel) + ₹400 (tolls)",
          "tollInfo": "Details about tolls if by car.",
          "weatherAdvisory": "Current weather forecast along the route.",
          "foodStops": ["Recommendation 1", "Recommendation 2"],
          "bookingLink": "A generic booking link (e.g., 'https://www.irctc.co.in' for trains)",
          "isCheapest": false,
          "steps": [ { "step": 1, "instruction": "...", "coordinates": { "lat": 1, "lng": 1 } } ]
        }],
        "cheapestRouteIndex": 0
      }
      CRITICAL: The ENTIRE output must be a single, valid JSON. Mark one route as isCheapest: true. Provide coordinates for each step.
    `;

    const result = await model.generateContent(detailedPrompt);
    const text = await result.response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    let responseObject;
    try {
      responseObject = JSON.parse(cleanedText);
    } catch (parseError) {
      throw new Error("The AI generated a malformed route itinerary. Please try again.");
    }


    const newRoute = await db.aiRoute.create({
      data: { userId: user?.id, startLocation, response: responseObject },
    });
    return { success: true, route: newRoute };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAiRoutes() {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    const routes = await db.aiRoute.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, routes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteAiRoute(id) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    await db.aiRoute.delete({ where: { id, userId: user?.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
