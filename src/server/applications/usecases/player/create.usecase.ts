import type { ICreatePlayerUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { Player, PlayerCreate } from "@/server/domain/models";

import { statTypeList } from "@/server/domain/models";

export class CreatePlayerUseCase implements ICreatePlayerUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  async invoke({ data }: { data: PlayerCreate }): Promise<Player> {
    const player = await this.playerRepo.create({ data });

    await Promise.all(
      statTypeList.map((type) =>
        this.playerRepo.createStat({ playerId: player.id, type }),
      ),
    );

    return player;
  }
}
