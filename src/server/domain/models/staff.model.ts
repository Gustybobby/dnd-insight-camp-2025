import type { z } from "zod";

import { staffsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Staff = createSelectSchema(staffsTable);
export type Staff = z.infer<typeof Staff>;
