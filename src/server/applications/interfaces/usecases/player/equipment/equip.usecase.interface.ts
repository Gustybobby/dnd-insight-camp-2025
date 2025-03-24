import type { PlayerEquipment } from "@/server/domain/models";

export interface IEquipEquipmentUseCase {
  invoke({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<PlayerEquipment>;
}
