import { playersTable } from "@/db/schema/players.schema";
import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";

export const sessionTurnsTable = pgTable(
  "session_turns",
  {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").notNull(),
    playerId: integer("player_id")
      .notNull()
      .references(() => playersTable.id, { onDelete: "set null" }),
    order: integer().notNull(),
  },
  (table) => [
    unique().on(table.sessionId, table.playerId),
    unique().on(table.sessionId, table.playerId, table.order),
  ],
);
