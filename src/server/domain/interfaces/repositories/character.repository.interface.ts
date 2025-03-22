import type { Character } from "@/server/domain/models";

export interface ICharacterRepository {
  getAll(): Promise<Character[]>;
}
