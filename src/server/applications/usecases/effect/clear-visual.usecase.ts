import type { IEffectRepository } from "@/server/domain/interfaces/repositories";
import type { Effect, Player } from "@/server/domain/models";

export class ClearVisualEffectUseCase {
  constructor(private readonly effectRepo: IEffectRepository) {}

  invoke({
    playerId,
    effectId,
  }: {
    playerId: Player["id"];
    effectId: Effect["id"];
  }): Promise<void> {
    return this.effectRepo.clearPlayerVisualEffect({ playerId, effectId });
  }
}
