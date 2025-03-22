import type { z } from "zod";

import { charactersTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Character = createSelectSchema(charactersTable);
export type Character = z.infer<typeof Character>;
