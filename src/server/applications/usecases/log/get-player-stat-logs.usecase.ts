import type { IGetPlayerStatLogsUseCase } from "@/server/applications/interfaces/usecases/log";
import type { IPlayerStatLogRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerStatLogFullInfo } from "@/server/domain/aggregates";
import type { PlayerStatLog } from "@/server/domain/models";

export class GetPlayerStatLogsUseCase implements IGetPlayerStatLogsUseCase {
  constructor(private readonly playerStatLogRepo: IPlayerStatLogRepository) {}

  async invoke({
    limit,
    playerId,
    effectId,
  }: {
    limit: number;
    playerId?: PlayerStatLog["playerId"];
    effectId?: PlayerStatLog["effectId"];
  }): Promise<PlayerStatLogFullInfo[]> {
    return this.playerStatLogRepo.getMany({ limit, playerId, effectId });
  }
}
