"use server";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";

/**
 * Generates AI-powered route suggestions from a start location to Pandharpur
 * @param {Object} formData - Contains startLocation
 * @returns {Object} Success status and generated route data
 */
export async function generateAiRoute(formData) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      throw new Error("CRITICAL: GEMINI_API_KEY is not configured.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const { startLocation } = formData;
    const detailedPrompt = `
      You are a logistics and travel expert only for Pandharpur City, India. A user wants to travel from "${startLocation}" to "Pandharpur, Maharashtra, India".
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
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const responseObject = JSON.parse(cleanedText);

    const newRoute = await db.aiRoute.create({
      data: { userId: user.id, startLocation, response: responseObject },
    });

    return { success: true, route: newRoute };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Retrieves all AI-generated routes for the authenticated user
 * @returns {Object} Success status and array of routes
 */
export async function getAiRoutes() {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    const routes = await db.aiRoute.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, routes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Deletes an AI-generated route by ID
 * @param {string} id - Route ID to delete
 * @returns {Object} Success status
 */
export async function deleteAiRoute(id) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    await db.aiRoute.delete({ where: { id, userId: user.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
