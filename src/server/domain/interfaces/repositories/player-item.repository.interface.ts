import { PlayerItemWithInfo } from "../../aggregates";

export interface IPlayerItemRepository {
  getAll(): Promise<PlayerItemWithInfo[]>;
}
