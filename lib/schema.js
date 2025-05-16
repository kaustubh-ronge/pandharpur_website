import { pgTable, serial, text, timestamp, varchar, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  clerkId: varchar('clerk_id', { length: 255 }).unique(),
  email: varchar('email', { length: 255 }),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const trips = pgTable('trips', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 36 }).references(() => users.id),
  destination: varchar('destination', { length: 255 }),
  itinerary: jsonb('itinerary'),
  coverImage: varchar('cover_image', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const aiSuggestions = pgTable('ai_suggestions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 36 }).references(() => users.id),
  suggestions: jsonb('suggestions'),
  generatedAt: timestamp('generated_at').defaultNow(),
});