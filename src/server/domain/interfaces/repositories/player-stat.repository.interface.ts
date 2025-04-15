import type { PlayerStat } from "../../models";

export interface IPlayerStatRepository {
  getAll(): Promise<PlayerStat[]>;
}
