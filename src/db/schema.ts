import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  name: text("name").notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatarUrl: text("avatar_url"),

  role: text("role").notNull().default("student"),  
  age: integer("age").notNull(),
  batchYear: integer("batch_year"),
  department: text("department"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
