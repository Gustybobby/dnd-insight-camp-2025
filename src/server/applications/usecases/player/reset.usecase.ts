import { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import { IResetPlayerDataUseCase } from "../../interfaces/usecases/player";
import { PlayerStat } from "@/server/domain/models";
import { ALL_STAT_TYPES, DEFAULT_STAT_VALUES } from "@/shared/stat";

export class ResetPlayerDataUseCase implements IResetPlayerDataUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({ playerId }: { playerId: number }): Promise<void> {
    const stats: PlayerStat[] = ALL_STAT_TYPES.map((type, index) => {
      return {
        playerId: playerId,
        type: type,
        value: DEFAULT_STAT_VALUES[index],
      };
    });

    await this.playerRepo.setStats({ data: stats });
    await this.playerRepo.removeAllItemsAndEquipments({ playerId });
  }
}
