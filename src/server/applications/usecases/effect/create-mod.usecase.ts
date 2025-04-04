import type { ICreateModEffectUseCase } from "@/server/applications/interfaces/usecases/effect";
import type { IEffectService } from "@/server/domain/interfaces/services/applications";
import type {
  ModEffect,
  ModEffectCreate,
  PlayerStatLog,
} from "@/server/domain/models";

export class CreateModEffectUseCase implements ICreateModEffectUseCase {
  constructor(private readonly effectService: IEffectService) {}

  async invoke({
    data,
    playerIds,
    staffId,
  }: {
    data: ModEffectCreate;
    playerIds: PlayerStatLog["playerId"][];
    staffId: PlayerStatLog["staffId"];
  }): Promise<ModEffect> {
    return this.effectService.createAndApplyModEffect({
      data,
      playerIds,
      staffId,
    });
  }
}
