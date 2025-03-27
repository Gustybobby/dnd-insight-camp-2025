import { Player } from "@/server/domain/models";

export interface IResetPlayerDataUseCase {
  invoke({ playerId }: { playerId: Player["id"] }): Promise<void>;
}
