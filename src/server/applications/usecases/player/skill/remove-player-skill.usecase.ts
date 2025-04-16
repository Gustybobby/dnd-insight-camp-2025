import { IRemovePlayerSkillUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkill } from "@/server/domain/models";

export class RemovePlayerSkillUseCase implements IRemovePlayerSkillUseCase {
  constructor(private readonly playerSkillRepo: IPlayerSkillRepository) {}

  async invoke({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill> {
    return this.playerSkillRepo.delete({ playerId, skillId });
  }
}
