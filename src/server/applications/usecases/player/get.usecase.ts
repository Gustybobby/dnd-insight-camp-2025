import type { IGetPlayerUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { Player } from "@/server/domain/models";

export class GetPlayerUseCase implements IGetPlayerUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({ playerId }: { playerId: Player["id"] }): Promise<Player> {
    return this.playerRepo.getByIdOrThrow({ playerId });
  }
}
