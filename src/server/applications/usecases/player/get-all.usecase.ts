import type { IGetAllPlayersUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { Player } from "@/server/domain/models";

export class GetAllPlayersUseCase implements IGetAllPlayersUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke(): Promise<Player[]> {
    return this.playerRepo.getAll();
  }
}
