import type { Skill } from "@/server/domain/models";

export interface ISkillRepository {
  getAll(): Promise<Skill[]>;
}
