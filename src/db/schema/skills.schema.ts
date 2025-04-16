import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const skillsTable = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull().default(""),
  cooldown: integer("cooldown").notNull(),
});
