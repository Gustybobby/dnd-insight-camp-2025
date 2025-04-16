import type { Item, ItemCreate } from "@/server/domain/models";

export interface IAddItemUseCase {
  invoke({ data }: { data: ItemCreate }): Promise<Item>;
}
