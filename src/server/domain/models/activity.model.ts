import type { z } from "zod";

import { activitiesTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Activity = createSelectSchema(activitiesTable);
export type Activity = z.infer<typeof Activity>;
