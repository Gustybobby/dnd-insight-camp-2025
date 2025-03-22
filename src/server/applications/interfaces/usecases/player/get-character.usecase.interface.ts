import { Character, Player } from "@/server/domain/models";

export interface IGetPlayerCharacterUseCase {
  invoke({ playerId }: { playerId: Player["id"] }): Promise<Character>;
}
