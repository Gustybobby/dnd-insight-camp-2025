import type { PlayerItem } from "@/server/domain/models";

export interface IDeletePlayerItemUseCase {
  invoke({ playerId, itemId }: Omit<PlayerItem, "amount">): Promise<PlayerItem>;
}
