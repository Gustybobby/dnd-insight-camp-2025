import type { z } from "zod";

import { usersTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const User = createSelectSchema(usersTable);
export type User = z.infer<typeof User>;
