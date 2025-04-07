import { IDeletePlayerEquipmentUseCase } from "@/server/applications/interfaces/usecases/player/equipment/delete.usecase.interface";
import { IEquipmentRepository } from "@/server/domain/interfaces/repositories";
import { PlayerEquipment } from "@/server/domain/models";

export class DeletePlayerEquipmentUseCase
  implements IDeletePlayerEquipmentUseCase
{
  constructor(private readonly equipmentRepo: IEquipmentRepository) {}

  async invoke({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<PlayerEquipment> {
    return this.equipmentRepo.delete({ playerId, itemId });
  }
}
