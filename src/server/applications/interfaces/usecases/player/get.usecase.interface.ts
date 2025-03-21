import type { Player } from "@/server/domain/models";

export interface IGetPlayerUseCase {
  invoke({ playerId }: { playerId: Player["id"] }): Promise<Player>;
}
