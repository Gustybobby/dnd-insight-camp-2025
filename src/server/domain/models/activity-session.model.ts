import type { z } from "zod";

import { activitySessionsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const ActivitySession = createSelectSchema(activitySessionsTable);
export type ActivitySession = z.infer<typeof ActivitySession>;
