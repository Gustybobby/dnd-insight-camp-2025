import type { Player } from "@/server/domain/models";

export interface IGetAllPlayersUseCase {
  invoke(): Promise<Player[]>;
}
