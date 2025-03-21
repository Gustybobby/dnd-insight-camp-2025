import type { z } from "zod";

import { effectsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Effect = createSelectSchema(effectsTable);
export type Effect = z.infer<typeof Effect>;
