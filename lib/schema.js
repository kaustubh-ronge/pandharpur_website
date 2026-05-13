// File: lib/schema.js

import * as z from "zod";

export const manualTripSchema = z.object({
  title: z.string().min(5).max(200),
  dateRange: z.object({
    from: z.date({ required_error: "A start date is required." }).or(z.string()),
    to: z.date({ required_error: "An end date is required." }).or(z.string()),
  }),
  locations: z.array(z.any()).min(1, "Please select at least one location."),
  preferences: z.string().max(2000).optional(),
});

export const aiTripSchema = z.object({
  prompt: z.string().min(10).max(1000),
  duration: z.coerce.number().min(1).max(30),
  people: z.coerce.number().min(1).max(100),
  budget: z.enum(["Budget", "Mid-Range", "Luxury"]),
});

export const aiRouteSchema = z.object({ 
  startLocation: z.string().min(2).max(100).trim() 
});

export const aiScheduleSchema = z.object({
  prompt: z.string().min(10).max(1000),
  date: z.date({ required_error: "A date for the schedule is required." }).or(z.string()),
});

export const chatMessageSchema = z.object({
  sessionId: z.string().uuid(),
  userMessage: z.string().min(1).max(2000).trim(),
  language: z.enum(['english', 'marathi', 'hindi']).default('english'),
});

export const sessionIdSchema = z.string().uuid();

export const joinUsInquirySchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  entityType: z.string().min(1).max(50),
  message: z.string().min(5).max(5000),
});

export const kirtankarInquirySchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  eventDate: z.string().or(z.date()),
  eventType: z.string().min(1).max(100),
  kirtankarSlug: z.string().min(1).max(100),
});

export const leadSchema = z.object({
  userName: z.string().min(2).max(100),
  userPhone: z.string().max(20).optional(),
  actionType: z.string(),
  entityId: z.string(),
  entityType: z.string(),
});

export const inquiryLeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  hotelSlug: z.string().optional().nullable(),
  bhaktaniwasSlug: z.string().optional().nullable(),
  travelSlug: z.string().optional().nullable(),
  entityType: z.string().optional(),
});

export const subscriptionSchema = z.object({
  planId: z.string().uuid(),
  businessType: z.string().min(1).max(100),
  businessName: z.string().min(2).max(200),
  contactPersonName: z.string().min(2).max(100),
  contactPhone: z.string().min(10).max(20),
  contactEmail: z.string().email().optional().nullable().or(z.literal('')),
  city: z.string().optional().nullable(),
  listingSlug: z.string().optional().nullable(),
});

export const paymentVerificationSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});
