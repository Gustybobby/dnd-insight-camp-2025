import type { Effect, Item, PlayerStatLog, User } from "@/server/domain/models";

export interface PlayerStatLogFullInfo extends PlayerStatLog {
  staff: User | null;
  effect: Effect | null;
  item: Item | null;
}
