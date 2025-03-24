import type { IEquipmentService } from "@/server/applications/interfaces/services/applications";
import type { IRemoveEquipmentUseCase } from "@/server/applications/interfaces/usecases/player/equipment";
import type { PlayerEquipment } from "@/server/domain/models";

export class RemoveEquipmentUseCase implements IRemoveEquipmentUseCase {
  constructor(private readonly equipmentService: IEquipmentService) {}

  async invoke({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void> {
    return this.equipmentService.onRemove({ playerId, itemId });
  }
}
