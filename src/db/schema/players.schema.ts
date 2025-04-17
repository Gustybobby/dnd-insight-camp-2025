import { charactersTable } from "@/db/schema/characters.schema";
import { usersTable } from "@/db/schema/users.schema";
import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  characterId: integer("character_id")
    .notNull()
    .references(() => charactersTable.id),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .unique(),
});
