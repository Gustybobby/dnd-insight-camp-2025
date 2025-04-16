import type { Skill, PlayerSkill } from "@/server/domain/models";

export interface ISkillRepository {
  getAll(): Promise<Skill[]>;
}
