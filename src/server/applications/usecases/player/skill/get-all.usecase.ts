import type { IGetAllPlayerSkillsUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import type { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkillWithInfo } from "@/server/domain/aggregates";

export class GetAllPlayerSkillsUseCase implements IGetAllPlayerSkillsUseCase {
  constructor(private readonly playerSkillRepo: IPlayerSkillRepository) {}

  async invoke({
    playerId,
  }: {
    playerId: PlayerSkillWithInfo["playerId"];
  }): Promise<PlayerSkillWithInfo[]> {
    return this.playerSkillRepo.getAll({ playerId });
  }
}
