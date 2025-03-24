import type { PlayerEquipment } from "@/server/domain/models";

export interface IRemoveEquipmentUseCase {
  invoke({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void>;
}
