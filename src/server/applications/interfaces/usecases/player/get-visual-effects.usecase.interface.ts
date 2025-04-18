import type { Effect, Player } from "@/server/domain/models";

export interface IGetPlayerVisualEffectsUseCase {
  invoke({ playerId }: { playerId: Player["id"] }): Promise<Effect[]>;
}
