import type { IGetPlayerStatsUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { Player, PlayerStat } from "@/server/domain/models";

import { ALL_STAT_TYPES } from "@/shared/stat";

export class GetPlayerStatsUseCase implements IGetPlayerStatsUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<PlayerStat[]> {
    return this.playerRepo.getAllStats({ playerId }).then((stats) =>
      ALL_STAT_TYPES.map((type) => {
        const stat = stats.find((stat) => stat.type === type);
        if (!stat) {
          throw new Error(`stat ${type} not found`);
        }
        return stat;
      }),
    );
  }
}
