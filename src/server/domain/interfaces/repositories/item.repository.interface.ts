import type { Item } from "@/server/domain/models";

export interface IItemRepository {
  getAll(): Promise<Item[]>;

  getByIdOrThrow({ itemId }: { itemId: Item["id"] }): Promise<Item>;
}
