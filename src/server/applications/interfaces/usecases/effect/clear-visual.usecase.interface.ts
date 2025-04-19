import type { Effect, Player } from "@/server/domain/models";

export interface IClearVisualEffectUseCase {
  invoke({
    playerId,
    effectId,
  }: {
    playerId: Player["id"];
    effectId: Effect["id"];
  }): Promise<void>;
}
