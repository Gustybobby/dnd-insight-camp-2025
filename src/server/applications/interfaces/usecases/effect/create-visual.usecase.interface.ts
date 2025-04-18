import type { Effect, PlayerStatLog } from "@/server/domain/models";

export interface ICreateVisualEffectUseCase {
  invoke({
    effectType,
    countdown,
    playerIds,
    staffId,
  }: {
    effectType: Effect["type"];
    countdown: Effect["countdown"];
    playerIds: PlayerStatLog["playerId"][];
    staffId: PlayerStatLog["staffId"];
  }): Promise<Effect>;
}
