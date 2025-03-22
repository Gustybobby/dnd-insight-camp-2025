import type { IGetPlayerCharacterUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { Character,Player } from "@/server/domain/models";

export class GetPlayerCharacterUseCase implements IGetPlayerCharacterUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  invoke({ playerId }: { playerId: Player["id"] }): Promise<Character> {
    return this.playerRepo.getCharacterOrThrow({ playerId });
  }
}
