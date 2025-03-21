import { playersTable } from "@/db/schema/players.schema";
import { integer, pgEnum, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const playerStatTypeEnum = pgEnum("player_stat_type", [
  "Str",
  "Dex",
  "Chr",
  "Int",
]);

export const playerStatsTable = pgTable(
  "player_stats",
  {
    playerId: integer("player_id")
      .notNull()
      .references(() => playersTable.id, { onDelete: "cascade" }),
    type: playerStatTypeEnum("type").notNull(),
    value: integer("value").notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.playerId, table.type] })],
);
