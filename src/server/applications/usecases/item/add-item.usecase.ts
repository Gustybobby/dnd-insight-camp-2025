import type { IAddItemUseCase } from "@/server/applications/interfaces/usecases/item";
import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { Item, ItemCreate } from "@/server/domain/models";

export class AddItemUseCase implements IAddItemUseCase {
  constructor(private readonly itemRepo: IItemRepository) {}

  async invoke({ data }: { data: ItemCreate }): Promise<Item> {
    return this.itemRepo.createItem({ data });
  }
}
