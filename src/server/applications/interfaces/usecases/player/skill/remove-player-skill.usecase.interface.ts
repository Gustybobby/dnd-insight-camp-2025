import type { PlayerSkill } from "@/server/domain/models";

export interface IRemovePlayerSkillUseCase {
  invoke({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill>;
}
