import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";

export interface IGetAllPlayerEquipmentsUseCase {
  invoke({
    playerId,
  }: {
    playerId: PlayerEquipmentWithInfo["playerId"];
  }): Promise<PlayerEquipmentWithInfo[]>;
}
