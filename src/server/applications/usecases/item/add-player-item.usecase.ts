import type { IAddPlayerItemUseCase } from "@/server/applications/interfaces/usecases/item";
import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerItem } from "@/server/domain/models";

export class AddPlayerItemUseCase implements IAddPlayerItemUseCase {
  constructor(private readonly itemRepo: IItemRepository) {}

  async invoke({ data }: { data: PlayerItem }): Promise<PlayerItem> {
    return this.itemRepo.createPlayerItem({ data });
  }
}
