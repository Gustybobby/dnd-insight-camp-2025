import type { ICreatePlayerUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { Player, PlayerCreate } from "@/server/domain/models";

import {
  DEFAULT_STAT_VALUES,
  ORDERED_STAT_TYPES,
} from "@/server/domain/models";

export class CreatePlayerUseCase implements ICreatePlayerUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({ data }: { data: PlayerCreate }): Promise<Player> {
    const player = await this.playerRepo.create({ data });

    await Promise.all(
      ORDERED_STAT_TYPES.map((type, idx) =>
        this.playerRepo.createStat({
          playerId: player.id,
          type,
          value: DEFAULT_STAT_VALUES[idx],
        }),
      ),
    );

    return player;
  }
}
