import { PlayerWithAllInfo } from "@/server/domain/aggregates";

export interface IGetAllPlayersInfoUseCase {
  invoke(): Promise<PlayerWithAllInfo[]>;
}
