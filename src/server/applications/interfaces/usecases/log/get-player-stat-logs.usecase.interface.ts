import type { PlayerStatLogFullInfo } from "@/server/domain/aggregates";
import type { PlayerStatLog } from "@/server/domain/models";

export interface IGetPlayerStatLogsUseCase {
  invoke({
    limit,
    playerId,
    effectId,
  }: {
    limit: number;
    playerId?: PlayerStatLog["playerId"];
    effectId?: PlayerStatLog["effectId"];
  }): Promise<PlayerStatLogFullInfo[]>;
}
