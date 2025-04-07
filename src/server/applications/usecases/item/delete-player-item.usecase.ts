import { PlayerItem } from "@/server/domain/models";
import { IDeletePlayerItemUseCase } from "../../interfaces/usecases/item";
import { IItemRepository } from "@/server/domain/interfaces/repositories";

export class DeletePlayerItemUseCase implements IDeletePlayerItemUseCase {
  constructor(private readonly itemRepo: IItemRepository) {}

  invoke({
    playerId,
    itemId,
  }: Omit<PlayerItem, "amount">): Promise<PlayerItem> {
    return this.itemRepo.deletePlayerItem({ playerId, itemId });
  }
}
