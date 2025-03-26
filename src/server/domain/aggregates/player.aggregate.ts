import type { Character, Player, PlayerStat } from "@/server/domain/models";
import type { PlayerEquipmentWithInfo, PlayerItemWithInfo } from ".";

export interface PlayerWithCharater extends Player {
  character: Character;
}

export interface PlayerWithAllInfo extends Player {
  character: Character;
  stats: PlayerStat[];
  equipments: PlayerEquipmentWithInfo[];
  playerItems: PlayerItemWithInfo[];
}
