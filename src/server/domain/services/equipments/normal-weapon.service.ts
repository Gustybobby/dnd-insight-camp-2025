import type {
  IEquipmentRepository,
  IItemRepository,
} from "@/server/domain/interfaces/repositories";
import type {
  IEffectService,
  IEquipmentService,
  IItemService,
} from "@/server/domain/interfaces/services/applications";
import type { PlayerEquipment } from "@/server/domain/models";

import { BaseEquipmentService } from "@/server/domain/services/equipments/base.service";

export class NormalWeaponService
  extends BaseEquipmentService
  implements IEquipmentService
{
  constructor(
    equipmentRepo: IEquipmentRepository,
    itemRepo: IItemRepository,
    itemService: IItemService,
    effectService: IEffectService,
  ) {
    super(
      { part: "Sword" },
      equipmentRepo,
      itemRepo,
      itemService,
      effectService,
    );
  }

  async onEquip({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<PlayerEquipment> {
    const equipment = await super.onEquip({ playerId, itemId });

    await this.modStats({ playerId, itemId });

    return equipment;
  }

  async onRemove({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void> {
    await super.onRemove({ playerId, itemId });

    await this.revertStats({ playerId, itemId });

    return;
  }
}
