import type { z } from "zod";

import { playerStatsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const PlayerStat = createSelectSchema(playerStatsTable);
export type PlayerStat = z.infer<typeof PlayerStat>;

export const StatTypeEnum = PlayerStat.shape.type;
export type StatTypeEnum = z.infer<typeof StatTypeEnum>;
