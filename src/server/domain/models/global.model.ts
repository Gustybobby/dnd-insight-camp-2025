import type { z } from "zod";

import { globalTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Global = createSelectSchema(globalTable);
export type Global = z.infer<typeof Global>;
