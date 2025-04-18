import type { z } from "zod";

import { playersTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Player = createSelectSchema(playersTable);
export type Player = z.infer<typeof Player>;

export const PlayerCreate = Player.omit({ id: true });
export type PlayerCreate = z.infer<typeof PlayerCreate>;

export const PlayerUpdate = Player.pick({
  name: true,
  characterId: true,
}).partial();
export type PlayerUpdate = z.infer<typeof PlayerUpdate>;
