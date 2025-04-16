import { IPlayerUseSkillUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkill } from "@/server/domain/models";

export class PlayerUseSkillUseCase implements IPlayerUseSkillUseCase {
  constructor(private readonly playerSkillRepo: IPlayerSkillRepository) {}

  async invoke({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill | null> {
    return this.playerSkillRepo.playerUseSkill({ playerId, skillId });
  }
}
