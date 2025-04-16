import type { Skill } from "@/server/domain/models";

export interface IGetAllSkillsUseCase {
  invoke(): Promise<Skill[]>;
}
