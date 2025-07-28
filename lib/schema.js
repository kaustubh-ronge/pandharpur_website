import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  jsonb,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  clerkId: varchar("clerk_id", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 36 }).references(() => users.id),
  destination: varchar("destination", { length: 255 }),
  itinerary: jsonb("itinerary"),
  coverImage: varchar("cover_image", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const aiSuggestions = pgTable("ai_suggestions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id)
    .unique(), // Add unique constraint here
 
  suggestions: jsonb("suggestions"),
  generatedAt: timestamp("generated_at").defaultNow(),
});


// Add this to your existing schema file
export const hotelBookings = pgTable("hotel_bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 36 }).references(() => users.id),
  category: varchar("category", { length: 50 }).notNull(), // 'hotel', 'bhaktniwas', etc.
  
  // Common fields
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  bookingDate: timestamp("booking_date").notNull(),
  people: integer("people").notNull(),
  specialRequests: text("special_requests"),
  
  // Hotel-specific fields
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  roomType: varchar("room_type", { length: 50 }),
  
  status: varchar("status", { length: 20 }).default('pending'), // pending, confirmed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});