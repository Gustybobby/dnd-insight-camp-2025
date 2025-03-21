import type { z } from "zod";

import { playersTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Player = createSelectSchema(playersTable);
export type Player = z.infer<typeof Player>;
