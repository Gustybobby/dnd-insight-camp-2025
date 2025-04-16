import type { Skill } from "@/server/domain/models";
import { IGetAllSkillsUseCase } from "@/server/applications/interfaces/usecases/skill";
import { ISkillRepository } from "@/server/domain/interfaces/repositories";

export class GetAllSkillsUseCase implements IGetAllSkillsUseCase {
  constructor(private readonly skillRepo: ISkillRepository) {}

  async invoke(): Promise<Skill[]> {
    return this.skillRepo.getAll();
  }
}
