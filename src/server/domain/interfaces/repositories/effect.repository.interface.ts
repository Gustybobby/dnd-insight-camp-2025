import type { EffectWithPlayerId } from "@/server/domain/aggregates";
import type {
  Effect,
  EffectCreate,
  ModEffect,
  ModEffectCreate,
  Player,
} from "@/server/domain/models";

export interface IEffectRepository {
  createModEffect({ data }: { data: ModEffectCreate }): Promise<ModEffect>;

  createEffect({ data }: { data: EffectCreate }): Promise<Effect>;

  getAllVisualEffects(): Promise<EffectWithPlayerId[]>;

  getPlayerVisualEffects({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<Effect[]>;

  decrementCountdown({ playerId }: { playerId: Player["id"] }): Promise<void>;

  setZeroCountdown({ playerId }: { playerId: Player["id"] }): Promise<void>;
}
