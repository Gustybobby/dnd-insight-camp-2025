import type { IGetAllCharactersUseCase } from "@/server/applications/interfaces/usecases/character";
import type { ICharacterRepository } from "@/server/domain/interfaces/repositories";
import type { Character } from "@/server/domain/models";

export class GetAllCharactersUseCase implements IGetAllCharactersUseCase {
  constructor(private readonly characterRepo: ICharacterRepository) {}

  async invoke(): Promise<Character[]> {
    return this.characterRepo.getAll();
  }
}
