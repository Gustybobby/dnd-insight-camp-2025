import type { IGetAllSkillsUseCase } from "@/server/applications/interfaces/usecases/skill";
import type { ISkillRepository } from "@/server/domain/interfaces/repositories";
import type { Skill } from "@/server/domain/models";

export class GetAllSkillsUseCase implements IGetAllSkillsUseCase {
  constructor(private readonly skillRepo: ISkillRepository) {}

  async invoke(): Promise<Skill[]> {
    return this.skillRepo.getAll();
  }
}
