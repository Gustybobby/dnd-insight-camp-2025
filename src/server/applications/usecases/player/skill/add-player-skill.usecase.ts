import type { PlayerSkill, PlayerSkillCreate } from "@/server/domain/models";
import { IAddPlayerSkillUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";

export class AddPlayerSkillUseCase implements IAddPlayerSkillUseCase {
  constructor(private readonly playerSkillRepo: IPlayerSkillRepository) {}

  async invoke({ data }: { data: PlayerSkillCreate }): Promise<PlayerSkill> {
    return this.playerSkillRepo.create({ data });
  }
}
