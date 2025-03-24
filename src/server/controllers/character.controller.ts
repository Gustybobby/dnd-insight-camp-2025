"use server";

import type { IGetAllCharactersUseCase } from "@/server/applications/interfaces/usecases/character";
import type { UseCaseReturn } from "@/server/controllers/utils";

import { CharacterRepository } from "@/server/infrastructure/repositories/character.repository";
import { GetAllCharactersUseCase } from "@/server/applications/usecases/character";

const characterRepo = new CharacterRepository();

const getAllChractersUseCase = new GetAllCharactersUseCase(characterRepo);

export async function getAllCharacters(): Promise<UseCaseReturn<IGetAllCharactersUseCase> | null> {
  return getAllChractersUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}
