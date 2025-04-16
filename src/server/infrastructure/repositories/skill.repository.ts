import type { ISkillRepository } from "@/server/domain/interfaces/repositories";
import type { Skill } from "@/server/domain/models";

import { db } from "@/db";
import { skillsTable } from "@/db/schema";

export class SkillRepository implements ISkillRepository {
  async getAll(): Promise<Skill[]> {
    return db.select().from(skillsTable);
  }
}
