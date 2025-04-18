import type { Effect, Player } from "@/server/domain/models";

export interface EffectWithPlayerId extends Effect {
  playerId: Player["id"];
}
