import type { Character, Player } from "@/server/domain/models";

export interface PlayerWithCharater extends Player {
  character: Character;
}
