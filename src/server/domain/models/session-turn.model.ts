import type { z } from "zod";

import { sessionTurnsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const SessionTurn = createSelectSchema(sessionTurnsTable);
export type SessionTurn = z.infer<typeof SessionTurn>;
