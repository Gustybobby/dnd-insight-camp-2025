import { playersTable } from "@/db/schema/players.schema";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  playerId: integer("player_id").references(() => playersTable.id),
});
