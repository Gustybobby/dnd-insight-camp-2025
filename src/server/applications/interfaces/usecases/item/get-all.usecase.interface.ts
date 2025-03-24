import type { Item } from "@/server/domain/models";

export interface IGetAllItemsUseCase {
  invoke(): Promise<Item[]>;
}
