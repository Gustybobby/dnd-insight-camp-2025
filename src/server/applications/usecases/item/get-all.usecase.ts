import type { IGetAllItemsUseCase } from "@/server/applications/interfaces/usecases/item";
import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { Item } from "@/server/domain/models";

export class GetAllItemsUseCase implements IGetAllItemsUseCase {
  constructor(private readonly itemRepo: IItemRepository) {}

  async invoke(): Promise<Item[]> {
    return this.itemRepo.getAll();
  }
}
