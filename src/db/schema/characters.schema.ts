import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const charactersTable = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
});
