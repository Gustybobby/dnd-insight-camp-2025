import type { IGetAllPlayersUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerWithCharater } from "@/server/domain/aggregates";

export class GetAllPlayersUseCase implements IGetAllPlayersUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke(): Promise<PlayerWithCharater[]> {
    return this.playerRepo.getAllWithCharacter();
  }
}
