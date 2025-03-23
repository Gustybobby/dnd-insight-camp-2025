import type {
  ModEffect,
  ModEffectCreate,
  PlayerStatLog,
} from "@/server/domain/models";

export interface ICreateModEffectUseCase {
  invoke({
    data,
    playerIds,
    staffId,
  }: {
    data: ModEffectCreate;
    playerIds: PlayerStatLog["playerId"][];
    staffId: PlayerStatLog["staffId"];
  }): Promise<ModEffect>;
}
