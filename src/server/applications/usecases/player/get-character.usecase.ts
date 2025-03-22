import { IGetPlayerCharacterUseCase } from "@/server/applications/interfaces/usecases/player";
import { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import { Player, Character } from "@/server/domain/models";

export class GetPlayerCharacterUseCase implements IGetPlayerCharacterUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  invoke({ playerId }: { playerId: Player["id"] }): Promise<Character> {
    return this.playerRepo.getCharacterOrThrow({ playerId });
  }
}
