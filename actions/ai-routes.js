
"use server";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";

export async function generateAiRoute(formData) {
  console.log("\n--- [ACTION: generateAiRoute] Received a new request ---");
  try {
    console.log("[ACTION: generateAiRoute] Step 1: Checking user...");
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");
    console.log(
      `[ACTION: generateAiRoute] Step 1 SUCCESS: User authenticated (ID: ${user.id})`
    );

    console.log(
      "[ACTION: generateAiRoute] Step 2: Checking for GEMINI_API_KEY..."
    );
    if (!process.env.GEMINI_API_KEY)
      throw new Error("CRITICAL: GEMINI_API_KEY is not configured.");
    console.log(
      "[ACTION: generateAiRoute] Step 2 SUCCESS: GEMINI_API_KEY found."
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const { startLocation } = formData;
    const detailedPrompt = `
      You are a logistics and travel expert. A user wants to travel from "${startLocation}" to "Pandharpur, Maharashtra, India".
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

    console.log(
      "[ACTION: generateAiRoute] Step 3: Sending prompt to Gemini AI..."
    );
    // const result = await model.generateContent(detailedPrompt);
    // const responseObject = JSON.parse(result.response.text());

    const result = await model.generateContent(detailedPrompt);
    const response = result.response;
    const text = response.text();
    const responseObject = text.replace(/```(?:json)?\n?/g, "").trim();
    console.log("AIROUTE", responseObject);

    console.log(responseObject)

    console.log(
      "[ACTION: generateAiRoute] Step 3 SUCCESS: Received and parsed AI response."
    );

    console.log("[ACTION: generateAiRoute] Step 4: Saving to database...");
    const newRoute = await db.aiRoute.create({
      data: { userId: user.id, startLocation, response: responseObject },
    });
    console.log(
      `[ACTION: generateAiRoute] Step 4 SUCCESS: Record created with ID: ${newRoute.id}`
    );

    return { success: true, route: newRoute };
  } catch (error) {
    console.error("\n--- [ACTION: generateAiRoute] CRITICAL FAILURE ---");
    console.error(
      `[ACTION: generateAiRoute] The process failed. Error: ${error.message}`
    );
    console.error("----------------------------------------\n");
    return { success: false, error: error.message };
  }
}

export async function getAiRoutes() {
  console.log("\n--- [ACTION: getAiRoutes] Received a new request ---");
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

export async function deleteAiRoute(id) {
  console.log(
    `\n--- [ACTION: deleteAiRoute] Received a new request for ID: ${id} ---`
  );
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    await db.aiRoute.delete({ where: { id, userId: user.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
