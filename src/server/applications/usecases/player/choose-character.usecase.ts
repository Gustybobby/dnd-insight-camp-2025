import type { IChooseCharacterUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";

export class ChooseCharacterUseCase implements IChooseCharacterUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({
    playerId,
    characterId,
  }: {
    playerId: number;
    characterId: number;
  }): Promise<void> {
    return this.playerRepo.updateCharacter({ playerId, characterId });
  }
}
