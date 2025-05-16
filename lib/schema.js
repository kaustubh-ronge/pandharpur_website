import { pgTable, serial, text, timestamp, varchar, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id').primaryKey(),
  clerkId: varchar('clerk_id').unique(),
  email: varchar('email'),
  name: varchar('name'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const trips = pgTable('trips', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  destination: varchar('destination'),
  itinerary: jsonb('itinerary'),
  coverImage: varchar('cover_image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const aiSuggestions = pgTable('ai_suggestions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  suggestions: jsonb('suggestions'),
  generatedAt: timestamp('generated_at').defaultNow(),
});