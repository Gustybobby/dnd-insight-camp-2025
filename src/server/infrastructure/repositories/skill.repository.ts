import type { ISkillRepository } from "@/server/domain/interfaces/repositories";
import type { Skill } from "@/server/domain/models";

import { db } from "@/db";
import { skillsTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";
import { eq } from "drizzle-orm";

export class SkillRepository implements ISkillRepository {
  async getAll(): Promise<Skill[]> {
    return db.select().from(skillsTable);
  }

  async getById({ skillId }: { skillId: Skill["id"] }): Promise<Skill> {
    return db
      .select()
      .from(skillsTable)
      .where(eq(skillsTable.id, skillId))
      .limit(1)
      .then(takeOneOrThrow);
  }
}
