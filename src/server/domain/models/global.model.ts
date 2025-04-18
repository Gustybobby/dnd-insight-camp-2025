import type { z } from "zod";

import { globalTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const GlobalType = createSelectSchema(globalTable);
export type GlobalType = z.infer<typeof GlobalType>;

export const PhaseEnum = GlobalType.shape.phase;
export type PhaseEnum = z.infer<typeof PhaseEnum>;
