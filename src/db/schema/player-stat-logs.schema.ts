import { effectsTable } from "@/db/schema/effects.schema";
import {
  playerStatsTable,
  playerStatTypeEnum,
} from "@/db/schema/player-stats.schema";
import { playersTable } from "@/db/schema/players.schema";
import { staffsTable } from "@/db/schema/staffs.schema";
import { timestamptz } from "@/db/util";
import {
  foreignKey,
  index,
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";

export const playerStatLogsTable = pgTable(
  "player_stat_logs",
  {
    id: serial("id").primaryKey(),
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
    index().using("btree", table.playerId),
    index().using("btree", table.effectId),
  ],
);
