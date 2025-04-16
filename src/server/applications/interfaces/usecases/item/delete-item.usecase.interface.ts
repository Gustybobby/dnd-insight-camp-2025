import type { Item } from "@/server/domain/models";

export interface IDeleteItemUseCase {
  invoke({ itemId }: { itemId: Item["id"] }): Promise<Item>;
}
