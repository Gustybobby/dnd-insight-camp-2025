import type { ICreateVisualEffectUseCase } from "@/server/applications/interfaces/usecases/effect";
import type { IEffectService } from "@/server/domain/interfaces/services/applications";
import type { Effect, PlayerStatLog } from "@/server/domain/models";

export class CreateVisualEffectUseCase implements ICreateVisualEffectUseCase {
  constructor(private readonly effectService: IEffectService) {}

  async invoke({
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
    return this.effectService.createAndApplyVisualEffect({
      effectType,
      countdown,
      playerIds,
      staffId,
    });
  }
}
