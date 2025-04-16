import type { Item, ItemCreate, PlayerItem } from "@/server/domain/models";

export interface IItemRepository {
  getAll(): Promise<Item[]>;

  getByIdOrThrow({ itemId }: { itemId: Item["id"] }): Promise<Item>;

  createPlayerItem({ data }: { data: PlayerItem }): Promise<PlayerItem>;

  deletePlayerItem({
    playerId,
    itemId,
  }: Omit<PlayerItem, "amount">): Promise<PlayerItem>;

  createItem({ data }: { data: ItemCreate }): Promise<Item>;
  deleteItem({ itemId }: { itemId: Item["id"] }): Promise<Item>;
}
