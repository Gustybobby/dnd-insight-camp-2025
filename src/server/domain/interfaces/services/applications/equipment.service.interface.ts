import type { PlayerEquipment } from "@/server/domain/models";

export interface IEquipmentService {
  onEquip({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<PlayerEquipment>;

  onActive({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void>;

  onRemove({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void>;
}
