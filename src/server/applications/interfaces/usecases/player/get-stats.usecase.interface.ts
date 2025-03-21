import type { Player, PlayerStat } from "@/server/domain/models";

export interface IGetPlayerStatsUseCase {
  invoke({ playerId }: { playerId: Player["id"] }): Promise<PlayerStat[]>;
}
