import type { IGetPlayerVisualEffectsUseCase } from "@/server/applications/interfaces/usecases/player";
import type { IEffectRepository } from "@/server/domain/interfaces/repositories";
import type { Effect, Player } from "@/server/domain/models";

export class GetPlayerVisualEffectsUseCase
  implements IGetPlayerVisualEffectsUseCase
{
  constructor(private readonly effectRepo: IEffectRepository) {}

  async invoke({ playerId }: { playerId: Player["id"] }): Promise<Effect[]> {
    return this.effectRepo.getPlayerVisualEffects({ playerId });
  }
}
