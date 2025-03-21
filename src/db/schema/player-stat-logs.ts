import { effectsTable } from "@/db/schema/effects";
import { playerStatsTable, playerStatTypeEnum } from "@/db/schema/player-stats";
import { playersTable } from "@/db/schema/players";
import { staffsTable } from "@/db/schema/staffs";
import { timestamptz } from "@/db/util";
import { foreignKey, integer, pgTable } from "drizzle-orm/pg-core";

export const playerStatLogsTable = pgTable(
  "player_stat_logs",
  {
    playerId: integer("player_id")
      .notNull()
      .references(() => playersTable.id, { onDelete: "cascade" }),
    type: playerStatTypeEnum("type").notNull(),
    value: integer("value").notNull(),
    staffId: integer("staff_id").references(() => staffsTable.id, {
      onDelete: "set null",
    }),
    effectId: integer("effect_id").references(() => effectsTable.id, {
      onDelete: "restrict",
    }),
    createdAt: timestamptz("created_at").defaultNow().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.playerId, table.type],
      foreignColumns: [playerStatsTable.playerId, playerStatsTable.type],
    }),
  ],
);
