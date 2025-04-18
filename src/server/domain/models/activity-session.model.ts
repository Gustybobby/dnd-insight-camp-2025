import type { z } from "zod";

import { activitySessionsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const ActivitySession = createSelectSchema(activitySessionsTable);
export type ActivitySession = z.infer<typeof ActivitySession>;

export const ActivitySessionUpdate = ActivitySession.pick({
  battleLogs: true,
  currentTurnId: true,
  bossTurnOrder: true,
  isActive: true,
}).partial();
export type ActivitySessionUpdate = z.infer<typeof ActivitySessionUpdate>;
