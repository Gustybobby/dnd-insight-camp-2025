import type { PlayerItemWithInfo } from "@/server/domain/aggregates";
import type { Player } from "@/server/domain/models";

export interface IGetPlayerItemsUseCase {
  invoke({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<PlayerItemWithInfo[]>;
}
