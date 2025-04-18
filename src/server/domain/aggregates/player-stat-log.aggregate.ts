import type {
  Character,
  Effect,
  Item,
  Player,
  PlayerStatLog,
  User,
} from "@/server/domain/models";

export interface PlayerStatLogFullInfo extends PlayerStatLog {
  staff: User | null;
  effect: Effect | null;
  item: Item | null;
}

export interface PlayerStatLogFullInfoPlusPlayerCharacter
  extends PlayerStatLogFullInfo {
  player: Player;
  character: Character;
  message?: string;
}
