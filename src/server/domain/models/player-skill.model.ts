import type { z } from "zod";

import { playerSkillsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const PlayerSkill = createSelectSchema(playerSkillsTable);
export type PlayerSkill = z.infer<typeof PlayerSkill>;

export const PlayerSkillCreate = PlayerSkill.pick({
  playerId: true,
  skillId: true,
  remainingUses: true,
});
export type PlayerSkillCreate = z.infer<typeof PlayerSkillCreate>;
