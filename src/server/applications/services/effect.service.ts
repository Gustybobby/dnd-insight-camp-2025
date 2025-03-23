import type { IEffectService } from "@/server/applications/interfaces/services/applications";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { ModEffectCreate, PlayerStatLog } from "@/server/domain/models";

import { db } from "@/db";
import { effectsTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";

import { ModEffect } from "@/server/domain/models";

export class EffectService implements IEffectService {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async createAndApplyModEffect({
    data,
    playerIds,
    staffId,
  }: {
    data: ModEffectCreate;
    playerIds: PlayerStatLog["playerId"][];
    staffId: PlayerStatLog["staffId"];
  }): Promise<ModEffect> {
    const effect = await db
      .insert(effectsTable)
      .values({ ...data, type: "Mod" })
      .returning()
      .then(takeOneOrThrow)
      .then(ModEffect.parse);
    await Promise.all(
      playerIds.map(async (playerId) => {
        const stat = await this.playerRepo.updateStat({
          data: {
            effectId: effect.id,
            type: effect.stat,
            value: effect.value,
            playerId,
            staffId,
          },
        });
        console.log("modified stat:", stat);
      }),
    );
    return effect;
  }
}
