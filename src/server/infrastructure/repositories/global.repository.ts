import type { IGlobalRepository } from "@/server/domain/interfaces/repositories";
import type { Global } from "@/server/domain/models";

import { db } from "@/db";
import { globalTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";

export class GlobalRepository implements IGlobalRepository {
  async getAll(): Promise<Global> {
    return db.select().from(globalTable).then(takeOneOrThrow);
  }
}
