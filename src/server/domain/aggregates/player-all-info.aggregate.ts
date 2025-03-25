import { PlayerEquipmentWithInfo, PlayerItemWithInfo } from ".";
import { Player, Character, PlayerStat } from "../models";

export interface PlayerWithAllInfo extends Player {
  character: Character;
  stats: PlayerStat[];
  equipments: PlayerEquipmentWithInfo[];
  playerItems: PlayerItemWithInfo[];
}
