import { charactersTable } from "@/db/schema/characters.schema";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  characterId: integer("character_id")
    .notNull()
    .references(() => charactersTable.id),
});
