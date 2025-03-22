import type { Character } from "@/server/domain/models";

export interface IGetAllCharactersUseCase {
  invoke(): Promise<Character[]>;
}
