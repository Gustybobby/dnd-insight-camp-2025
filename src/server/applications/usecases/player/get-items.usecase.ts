import type { IGetPlayerItemsUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerItemWithInfo } from "@/server/domain/aggregates";
import type { Player } from "@/server/domain/models";

export class GetPlayerItemsUseCase implements IGetPlayerItemsUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<PlayerItemWithInfo[]> {
    return this.playerRepo.getAllItems({ playerId });
  }
}
