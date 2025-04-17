import type {
  Character,
  Player,
  PlayerEquipment,
  PlayerItem,
  PlayerStat,
} from "@/server/domain/models";
import type { PlayerEquipmentWithInfo, PlayerItemWithInfo } from ".";

export interface PlayerWithCharacter extends Player {
  character: Character;
}

export interface PlayerWithAllInfo extends Player {
  character: Character;
  stats: PlayerStat[];
  equipments: PlayerEquipmentWithInfo[];
  playerItems: PlayerItemWithInfo[];
}

export interface PlayerWithItemsAndEquipments extends Player {
  playerItems: PlayerItem[];
  equipments: PlayerEquipment[];
}
