"use server";
import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";
import { format } from "date-fns";

/**
 * Generates an AI-powered schedule for a specific date based on user requirements
 * @param {Object} formData - Contains prompt and date
 * @returns {Object} Success status and generated schedule data
 */
export async function generateAiSchedule(formData) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      throw new Error("CRITICAL: GEMINI_API_KEY is not configured.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const { prompt, date } = formData;
    const detailedPrompt = `
      You are an expert personal scheduler only for Pandharpur City, India. A user needs a detailed schedule for the date: ${format(date, "PPPP")}.
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

    const result = await model.generateContent(detailedPrompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const responseObject = JSON.parse(cleanedText);

    const newSchedule = await db.aiSchedule.create({
      data: { userId: user.id, prompt: formData, response: responseObject },
    });

    return { success: true, schedule: newSchedule };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Retrieves all AI-generated schedules for the authenticated user
 * @returns {Object} Success status and array of schedules
 */
export async function getAiSchedules() {
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

/**
 * Deletes an AI-generated schedule by ID
 * @param {string} id - Schedule ID to delete
 * @returns {Object} Success status
 */
export async function deleteAiSchedule(id) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication required.");
    await db.aiSchedule.delete({ where: { id, userId: user.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
