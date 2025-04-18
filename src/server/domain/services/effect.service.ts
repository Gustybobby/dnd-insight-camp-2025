import type {
  IEffectRepository,
  IPlayerRepository,
} from "@/server/domain/interfaces/repositories";
import type { IEffectService } from "@/server/domain/interfaces/services/applications";
import type {
  Effect,
  ModEffectCreate,
  PlayerStatLog,
} from "@/server/domain/models";
import type { ModEffect } from "@/server/domain/models";

export class EffectService implements IEffectService {
  constructor(
    private readonly effectRepo: IEffectRepository,
    private readonly playerRepo: IPlayerRepository,
  ) {}

  async createAndApplyModEffect({
    data,
    playerIds,
    staffId,
  }: {
    data: ModEffectCreate;
    playerIds: PlayerStatLog["playerId"][];
    staffId: PlayerStatLog["staffId"];
  }): Promise<ModEffect> {
    const effect = await this.effectRepo.createModEffect({ data });
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

  async createAndApplyVisualEffect({
    effectType,
    countdown,
    playerIds,
    staffId,
  }: {
    effectType: Effect["type"];
    countdown: Effect["countdown"];
    playerIds: PlayerStatLog["playerId"][];
    staffId: PlayerStatLog["staffId"];
  }): Promise<Effect> {
    const effect = await this.effectRepo.createEffect({
      data: { type: effectType, stat: null, itemId: null, value: 0, countdown },
    });
    await Promise.all(
      playerIds.map(async (playerId) => {
        await this.playerRepo.updateStat({
          data: {
            effectId: effect.id,
            type: "HP",
            value: 0,
            playerId,
            staffId,
          },
        });
        console.log(`apply visual effect to player ${playerId}`, effectType);
      }),
    );
    return effect;
  }
}
