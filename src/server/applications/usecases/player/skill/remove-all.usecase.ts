import { IRemoveAllPlayerSkillsUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkill } from "@/server/domain/models";

export class RemoveAllPlayerSkillsUseCase
  implements IRemoveAllPlayerSkillsUseCase
{
  constructor(private readonly playerSkillRepo: IPlayerSkillRepository) {}

  async invoke({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkill[]> {
    return this.playerSkillRepo.deleteAll({ playerId });
  }
}
