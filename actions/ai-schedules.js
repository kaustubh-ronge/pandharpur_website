
"use server";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";
import { format } from "date-fns";

export async function generateAiSchedule(formData) {
  console.log("\n--- [ACTION: generateAiSchedule] Received a new request ---");
  try {
    console.log("[ACTION: generateAiSchedule] Step 1: Checking user...");
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");
    console.log(
      `[ACTION: generateAiSchedule] Step 1 SUCCESS: User authenticated (ID: ${user.id})`
    );

    console.log(
      "[ACTION: generateAiSchedule] Step 2: Checking for GEMINI_API_KEY..."
    );
    if (!process.env.GEMINI_API_KEY)
      throw new Error("CRITICAL: GEMINI_API_KEY is not configured.");
    console.log(
      "[ACTION: generateAiSchedule] Step 2 SUCCESS: GEMINI_API_KEY found."
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { prompt, date } = formData;
    const detailedPrompt = `
      You are an expert personal scheduler. A user needs a detailed schedule for the date: ${format(date, "PPPP")}.
      Their request is: "${prompt}".
      
      Generate a JSON object with this exact structure:
      {
        "scheduleTitle": "A title for the day's schedule",
        "scheduleDate": "${format(date, "yyyy-MM-dd")}",
        "timeSlots": [{
          "startTime": "e.g., 08:00 AM",
          "endTime": "e.g., 09:30 AM",
          "activity": "Detailed name of the activity",
          "location": "Location name, if applicable",
          "coordinates": { "lat": 1, "lng": 1 },
          "notes": "Important notes or reminders for this time slot."
        }]
      }
      CRITICAL: The ENTIRE output must be a single, valid JSON object. Provide coordinates if a location is mentioned.
    `;

    console.log(
      "[ACTION: generateAiSchedule] Step 3: Sending prompt to Gemini AI..."
    );
    const result = await model.generateContent(detailedPrompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const responseObject = JSON.parse(cleanedText);
    console.log(
      "[ACTION: generateAiSchedule] Step 3 SUCCESS: Received and parsed AI response."
    );

    console.log("[ACTION: generateAiSchedule] Step 4: Saving to database...");
    const newSchedule = await db.aiSchedule.create({
      data: { userId: user.id, prompt: formData, response: responseObject },
    });
    console.log(
      `[ACTION: generateAiSchedule] Step 4 SUCCESS: Record created with ID: ${newSchedule.id}`
    );

    return { success: true, schedule: newSchedule };
  } catch (error) {
    console.error("\n--- [ACTION: generateAiSchedule] CRITICAL FAILURE ---");
    console.error(
      `[ACTION: generateAiSchedule] The process failed. Error: ${error.message}`
    );
    console.error("----------------------------------------\n");
    return { success: false, error: error.message };
  }
}

export async function getAiSchedules() {
  console.log("\n--- [ACTION: getAiSchedules] Received a new request ---");
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    const schedules = await db.aiSchedule.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, schedules };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteAiSchedule(id) {
  console.log(
    `\n--- [ACTION: deleteAiSchedule] Received a new request for ID: ${id} ---`
  );
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    await db.aiSchedule.delete({ where: { id, userId: user.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
