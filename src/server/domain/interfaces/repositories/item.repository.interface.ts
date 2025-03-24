import type { Item } from "@/server/domain/models";

export interface IItemRepository {
  getByIdOrThrow({ itemId }: { itemId: Item["id"] }): Promise<Item>;
}
