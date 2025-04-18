import type { IAddPlayerItemUseCase } from "@/server/applications/interfaces/usecases/item";
import type {
  IEquipmentRepository,
  IItemRepository,
} from "@/server/domain/interfaces/repositories";
import type { PlayerItem } from "@/server/domain/models";

export class AddPlayerItemUseCase implements IAddPlayerItemUseCase {
  constructor(
    private readonly itemRepo: IItemRepository,
    private readonly equipmentRepo: IEquipmentRepository,
  ) {}

  async invoke({ data }: { data: PlayerItem }): Promise<PlayerItem> {
    const equipments = await this.equipmentRepo.getPlayerEquipments({
      playerId: data.playerId,
    });
    if (equipments.some((equipment) => equipment.itemId === data.itemId)) {
      throw new Error("cannot add item since item already exists but equipped");
    }
    return this.itemRepo.createPlayerItem({ data });
  }
}
