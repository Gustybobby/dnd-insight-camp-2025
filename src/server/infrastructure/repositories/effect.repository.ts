import type { IEffectRepository } from "@/server/domain/interfaces/repositories";
import type { ModEffect, ModEffectCreate } from "@/server/domain/models";

import { db } from "@/db";
import { effectsTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";

export class EffectRepository implements IEffectRepository {
  async createModEffect({
    data,
  }: {
    data: ModEffectCreate;
  }): Promise<ModEffect> {
    const effect = await db
      .insert(effectsTable)
      .values({ ...data, type: "Mod" })
      .returning()
      .then(takeOneOrThrow);
    return effect as ModEffect;
  }
}
