import { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import { IResetPlayerDataUseCase } from "../../interfaces/usecases/player";
import { PlayerStat } from "@/server/domain/models";
import { ALL_STAT_TYPES } from "@/shared/stat";

export class ResetPlayerDataUseCase implements IResetPlayerDataUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({ playerId }: { playerId: number }): Promise<void> {
    const stats: PlayerStat[] = ALL_STAT_TYPES.map((type) => {
      return {
        playerId: playerId,
        type: type,
        value: 0,
      };
    });
    console.log(stats);
    await this.playerRepo.setStats({ data: stats });
  }
}
