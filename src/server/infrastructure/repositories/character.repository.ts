import type { ICharacterRepository } from "@/server/domain/interfaces/repositories";
import type { Character } from "@/server/domain/models";

import { db } from "@/db";
import { charactersTable } from "@/db/schema";

export class CharacterRepository implements ICharacterRepository {
  async getAll(): Promise<Character[]> {
    return db.select().from(charactersTable);
  }
}
