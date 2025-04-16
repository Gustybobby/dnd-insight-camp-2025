import type { PlayerSkillWithInfo } from "@/server/domain/aggregates";

export interface IGetAllPlayerSkillsUseCase {
  invoke({
    playerId,
  }: {
    playerId: PlayerSkillWithInfo["playerId"];
  }): Promise<PlayerSkillWithInfo[]>;
}
