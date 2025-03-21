import type { z } from "zod";

import { playerStatLogsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const PlayerStatLog = createSelectSchema(playerStatLogsTable);
export type PlayerStatLog = z.infer<typeof PlayerStatLog>;
