import type { PlayerEquipment } from "@/server/domain/models";

export interface IDeletePlayerEquipmentUseCase {
  invoke({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<PlayerEquipment>;
}
