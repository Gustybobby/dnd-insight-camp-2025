import type { PlayerWithCharacter } from "@/server/domain/aggregates";

export interface IGetAllPlayersUseCase {
  invoke(): Promise<PlayerWithCharacter[]>;
}
