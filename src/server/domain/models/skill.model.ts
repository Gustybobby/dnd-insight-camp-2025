import type { z } from "zod";

import { skillsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Skill = createSelectSchema(skillsTable);
export type Skill = z.infer<typeof Skill>;
