import { IGetAllPlayerSkillsUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import { PlayerSkillWithInfo } from "@/server/domain/aggregates";

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
