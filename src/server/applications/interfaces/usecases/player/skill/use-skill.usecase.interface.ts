import type { PlayerSkill } from "@/server/domain/models";

export interface IPlayerUseSkillUseCase {
  invoke({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill | null>;
}
