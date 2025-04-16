import type { IDeleteItemUseCase } from "@/server/applications/interfaces/usecases/item";
import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { Item } from "@/server/domain/models";

export class DeleteItemUseCase implements IDeleteItemUseCase {
  constructor(private readonly itemRepo: IItemRepository) {}

  async invoke({ itemId }: { itemId: Item["id"] }): Promise<Item> {
    return this.itemRepo.deleteItem({ itemId });
  }
}
