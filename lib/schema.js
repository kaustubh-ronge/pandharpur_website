// File: lib/schema.js

import * as z from "zod";

/**
 * Zod Schemas
 *
 * This file defines all the Zod schemas used for form validation
 * in the trip planner application.
 */
export const manualTripSchema = z.object({
  title: z.string().min(5),
  dateRange: z.object({
    from: z.date({ required_error: "A start date is required." }),
    to: z.date({ required_error: "An end date is required." }),
  }),
  locations: z.array(z.string()).min(1, "Please select at least one location."),
  preferences: z.string().optional(),
});
export const aiTripSchema = z.object({
  prompt: z.string().min(15),
  duration: z.coerce.number().min(1).max(7),
  people: z.coerce.number().min(1),
  budget: z.enum(["Budget", "Mid-Range", "Luxury"]),
});
export const aiRouteSchema = z.object({ startLocation: z.string().min(3) });
export const aiScheduleSchema = z.object({
  prompt: z.string().min(20),
  date: z.date({ required_error: "A date for the schedule is required." }),
});
