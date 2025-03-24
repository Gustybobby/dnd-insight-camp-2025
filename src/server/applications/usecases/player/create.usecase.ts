import type { ICreatePlayerUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { Player, PlayerCreate } from "@/server/domain/models";

import { ALL_STAT_TYPES, DEFAULT_STAT_VALUES } from "@/shared/stat";

export class CreatePlayerUseCase implements ICreatePlayerUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({ data }: { data: PlayerCreate }): Promise<Player> {
    const player = await this.playerRepo.create({ data });

    await Promise.all(
      ALL_STAT_TYPES.map((type, idx) =>
        this.playerRepo.createStat({
          data: {
            playerId: player.id,
            type,
            value: DEFAULT_STAT_VALUES[idx],
          },
        }),
      ),
    );

    return player;
  }
}
