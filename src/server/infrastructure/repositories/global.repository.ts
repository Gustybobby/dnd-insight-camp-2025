import type { IGlobalRepository } from "@/server/domain/interfaces/repositories";
import type { GlobalType } from "@/server/domain/models";

import { db } from "@/db";
import { globalTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";

export class GlobalRepository implements IGlobalRepository {
  async getAll(): Promise<GlobalType> {
    return db.select().from(globalTable).then(takeOneOrThrow);
  }
  async setPhase({
    phase,
  }: {
    phase: GlobalType["phase"];
  }): Promise<GlobalType> {
    return db
      .update(globalTable)
      .set({ phase })
      .returning()
      .then(takeOneOrThrow);
  }
}
