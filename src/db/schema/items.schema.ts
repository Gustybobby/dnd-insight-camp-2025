import { sql } from "drizzle-orm";
import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const itemTypeEnum = pgEnum("item_type", ["Armor", "Weapon", "Others"]);

export const itemsTable = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  type: itemTypeEnum("type").notNull().default("Others"),
  description: text("description").notNull().default(""),
  stats: text("stats")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
});
