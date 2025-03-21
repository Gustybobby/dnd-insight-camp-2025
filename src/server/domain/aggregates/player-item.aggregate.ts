import type { Item, PlayerItem } from "@/server/domain/models";

export interface PlayerItemWithInfo extends PlayerItem {
  item: Item;
}
