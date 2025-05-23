import type { IEquipEquipmentUseCase } from "@/server/applications/interfaces/usecases/player/equipment";
import type { IEquipmentService } from "@/server/domain/interfaces/services/applications";
import type { PlayerEquipment } from "@/server/domain/models";

export class EquipEquipmentUseCase implements IEquipEquipmentUseCase {
  constructor(private readonly equipmentService: IEquipmentService) {}

  async invoke({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<PlayerEquipment> {
    return this.equipmentService.onEquip({ playerId, itemId });
  }
}
