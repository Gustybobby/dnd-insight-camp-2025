import type { PlayerUpdate } from "@/server/domain/models";

export interface IUpdatePlayerUseCase {
  invoke({
    playerId,
    data,
  }: {
    playerId: number;
    data: PlayerUpdate;
  }): Promise<void>;
}
