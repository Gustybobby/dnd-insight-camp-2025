import { activitiesTable } from "@/db/schema/activities.schema";
import { sessionTurnsTable } from "@/db/schema/session-turns.schema";
import { timestamptz } from "@/db/util";
import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const activitySessionsTable = pgTable("activity_sessions", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activitiesTable.id),
  createdAt: timestamptz("created_at").defaultNow().notNull(),
  currentTurnId: integer("current_turn_id").references(
    () => sessionTurnsTable.id,
  ),
});
