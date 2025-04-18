import type { z } from "zod";

import { effectsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Effect = createSelectSchema(effectsTable);
export type Effect = z.infer<typeof Effect>;

export const EffectTypeEnum = Effect.shape.type;
export type EffectTypeEnum = z.infer<typeof EffectTypeEnum>;

export const EffectCreate = Effect.omit({ id: true, createdAt: true });
export type EffectCreate = z.infer<typeof EffectCreate>;

/**Stat Modification Effect */
export const ModEffect = Effect.pick({
  id: true,
  itemId: true,
  stat: true,
  value: true,
}).extend({
  stat: Effect.shape.stat.unwrap(),
  value: Effect.shape.value.unwrap(),
});
export type ModEffect = z.infer<typeof ModEffect>;

export const ModEffectCreate = ModEffect.omit({ id: true });
export type ModEffectCreate = z.infer<typeof ModEffectCreate>;
