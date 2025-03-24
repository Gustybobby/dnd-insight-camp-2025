import type { Item, PlayerItem } from "@/server/domain/models";

export interface IItemRepository {
  getAll(): Promise<Item[]>;

  getByIdOrThrow({ itemId }: { itemId: Item["id"] }): Promise<Item>;

  createPlayerItem({ data }: { data: PlayerItem }): Promise<PlayerItem>;
}
