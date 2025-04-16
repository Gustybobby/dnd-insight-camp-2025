import type { PlayerSkill } from "@/server/domain/models";

export interface IRemoveAllPlayerSkillsUseCase {
  invoke({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkill[]>;
}
