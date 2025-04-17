import { activitiesTable } from "@/db/schema/activities.schema";
import { sessionTurnsTable } from "@/db/schema/session-turns.schema";
import { timestamptz } from "@/db/util";
import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const activitySessionsTable = pgTable("activity_sessions", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activitiesTable.id),
  createdAt: timestamptz("created_at").defaultNow().notNull(),
  currentTurnId: integer("current_turn_id").references(
    () => sessionTurnsTable.id,
  ),
  battleLogs: text()
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  isActive: boolean("is_active").notNull().default(true),
});
