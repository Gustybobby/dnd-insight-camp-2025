import type { IDeletePlayerItemUseCase } from "../../interfaces/usecases/item";
import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerItem } from "@/server/domain/models";

export class DeletePlayerItemUseCase implements IDeletePlayerItemUseCase {
  constructor(private readonly itemRepo: IItemRepository) {}

  invoke({
    playerId,
    itemId,
  }: Omit<PlayerItem, "amount">): Promise<PlayerItem> {
    return this.itemRepo.deletePlayerItem({ playerId, itemId });
  }
}
