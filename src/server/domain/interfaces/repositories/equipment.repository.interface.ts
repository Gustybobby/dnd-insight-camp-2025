import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type { PlayerEquipment } from "@/server/domain/models";

export interface IEquipmentRepository {
  getPlayerEquipments({
    playerId,
  }: {
    playerId: PlayerEquipmentWithInfo["playerId"];
  }): Promise<PlayerEquipmentWithInfo[]>;

  playerEquipmentExists({
    playerId,
    part,
  }: Pick<PlayerEquipment, "playerId" | "part">): Promise<boolean>;

  /**
   * ### Transaction Steps
   * 1. Check if player item exists.
   * 2. If item amount is one, delete else, decrement amount
   * 3. Create player equipment.
   */
  playerEquip({ data }: { data: PlayerEquipment }): Promise<PlayerEquipment>;

  /**
   * ### Transaction Steps
   * 1. Delete player equipment.
   * 3. Increment player item or create if not exists.
   */
  playerRemove({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void>;
}
