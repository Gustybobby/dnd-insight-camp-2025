import { skillsTable } from "@/db/schema/skills.schema";
import { playersTable } from "@/db/schema/players.schema";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const playerSkillsTable = pgTable(
  "player_skills",
  {
    playerId: integer("player_id")
      .notNull()
      .references(() => playersTable.id, { onDelete: "cascade" }),
    skillId: integer("skill_id")
      .notNull()
      .references(() => skillsTable.id, { onDelete: "cascade" }),
    cooldown: integer("amount").notNull().default(0),
    remainingUses: integer("remaining_uses").notNull(),
  },
  (table) => [primaryKey({ columns: [table.playerId, table.skillId] })],
);
