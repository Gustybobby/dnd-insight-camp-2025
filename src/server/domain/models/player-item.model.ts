import type { z } from "zod";

import { playerItemsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const PlayerItem = createSelectSchema(playerItemsTable);
export type PlayerItem = z.infer<typeof PlayerItem>;
