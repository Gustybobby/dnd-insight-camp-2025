import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates/player-equipment.aggregate";
import type { PlayerItemWithInfo } from "@/server/domain/aggregates/player-item.aggregate";
import type { PlayerSkillWithInfo } from "@/server/domain/aggregates/player-skill.aggregate";
import type {
  Character,
  Effect,
  Player,
  PlayerEquipment,
  PlayerItem,
  PlayerSkill,
  PlayerStat,
} from "@/server/domain/models";

export interface PlayerWithCharacter extends Player {
  character: Character;
}

export interface PlayerWithAllInfo extends Player {
  character: Character;
  stats: PlayerStat[];
  effects: Effect[];
  equipments: PlayerEquipmentWithInfo[];
  playerItems: PlayerItemWithInfo[];
  playerSkills: PlayerSkillWithInfo[];
}

export interface PlayerWithItemsAndEquipments extends Player {
  playerItems: PlayerItem[];
  equipments: PlayerEquipment[];
}

export interface PlayerWithSkills extends Player {
  playerSkills: PlayerSkill[];
}
