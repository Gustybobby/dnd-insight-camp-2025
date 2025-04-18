import type {
  Effect,
  ModEffect,
  ModEffectCreate,
  PlayerStatLog,
} from "@/server/domain/models";

export interface IEffectService {
  createAndApplyModEffect({
    data,
    playerIds,
    staffId,
  }: {
    data: ModEffectCreate;
    playerIds: PlayerStatLog["playerId"][];
    staffId: PlayerStatLog["staffId"];
  }): Promise<ModEffect>;

  createAndApplyVisualEffect({
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
