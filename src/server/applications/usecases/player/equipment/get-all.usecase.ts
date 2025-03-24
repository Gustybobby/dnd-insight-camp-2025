import type { IGetAllPlayerEquipmentsUseCase } from "@/server/applications/interfaces/usecases/player/equipment";
import type { IEquipmentRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";

export class GetAllPlayerEquipmentsUseCase
  implements IGetAllPlayerEquipmentsUseCase
{
  constructor(private readonly equipmentRepo: IEquipmentRepository) {}

  async invoke({
    playerId,
  }: {
    playerId: PlayerEquipmentWithInfo["playerId"];
  }): Promise<PlayerEquipmentWithInfo[]> {
    return this.equipmentRepo.getPlayerEquipments({ playerId });
  }
}
