import type { IUpdatePlayerUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerUpdate } from "@/server/domain/models";

export class UpdatePlayerUseCase implements IUpdatePlayerUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({
    playerId,
    data,
  }: {
    playerId: number;
    data: PlayerUpdate;
  }): Promise<void> {
    return this.playerRepo.update({ playerId, data });
  }
}
