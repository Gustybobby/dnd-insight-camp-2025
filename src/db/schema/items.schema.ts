import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const itemsTable = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull().default(""),
});
