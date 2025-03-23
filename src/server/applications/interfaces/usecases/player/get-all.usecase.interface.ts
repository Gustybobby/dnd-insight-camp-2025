import type { PlayerWithCharater } from "@/server/domain/aggregates";

export interface IGetAllPlayersUseCase {
  invoke(): Promise<PlayerWithCharater[]>;
}
