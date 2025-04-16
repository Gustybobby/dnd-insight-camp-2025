import type { PlayerSkill, PlayerSkillCreate } from "@/server/domain/models";

export interface IAddPlayerSkillUseCase {
  invoke({ data }: { data: PlayerSkillCreate }): Promise<PlayerSkill>;
}
