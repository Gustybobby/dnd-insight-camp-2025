import type {
  PlayerStatLogFullInfo,
  PlayerStatLogFullInfoPlusPlayerCharacter,
} from "@/server/domain/aggregates";
import type { PlayerStatLog } from "@/server/domain/models";

export interface IPlayerStatLogRepository {
  getAllWithFullInfoPlus(): Promise<PlayerStatLogFullInfoPlusPlayerCharacter[]>;

  getMany({
    limit,
    playerId,
    effectId,
  }: {
    limit: number;
    playerId?: PlayerStatLog["playerId"];
    effectId?: PlayerStatLog["effectId"];
  }): Promise<PlayerStatLogFullInfo[]>;
}
