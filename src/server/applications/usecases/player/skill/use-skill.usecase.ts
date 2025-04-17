import type { IPlayerUseSkillUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import type { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkill } from "@/server/domain/models";

export class PlayerUseSkillUseCase implements IPlayerUseSkillUseCase {
  constructor(private readonly playerSkillRepo: IPlayerSkillRepository) {}

  async invoke({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill | null> {
    console.log("player", playerId, "using skill", skillId);
    return this.playerSkillRepo.playerUseSkill({ playerId, skillId });
  }
}
