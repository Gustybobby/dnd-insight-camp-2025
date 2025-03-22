import type { Item, PlayerEquipment } from "@/server/domain/models";

export interface PlayerEquipmentWithInfo extends PlayerEquipment {
  item: Item;
}
