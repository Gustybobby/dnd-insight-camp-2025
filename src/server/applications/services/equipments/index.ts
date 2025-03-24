import type {
  IEffectService,
  IEquipmentService,
  IItemService,
} from "@/server/applications/interfaces/services/applications";
import type {
  IEquipmentRepository,
  IItemRepository,
} from "@/server/domain/interfaces/repositories";
import type { Item, ItemTypeEnum } from "@/server/domain/models";

import { BaseEquipmentService } from "@/server/applications/services/equipments/base.service";
import { NormalArmorService } from "@/server/applications/services/equipments/normal-armor.service";

export class EquipmentService {
  private readonly serviceMap: Record<
    Exclude<ItemTypeEnum, "Others">,
    IEquipmentService
  >;

  constructor(
    equipmentRepo: IEquipmentRepository,
    private readonly itemRepo: IItemRepository,
    itemService: IItemService,
    effectService: IEffectService,
  ) {
    this.serviceMap = {
      Armor: new NormalArmorService(
        equipmentRepo,
        itemRepo,
        itemService,
        effectService,
      ),
      Weapon: new BaseEquipmentService(
        { part: "Sword" },
        equipmentRepo,
        itemRepo,
        itemService,
        effectService,
      ),
    };
  }

  async use({ itemId }: { itemId: Item["id"] }) {
    const item = await this.itemRepo.getByIdOrThrow({ itemId });
    if (item.type !== "Armor" && item.type !== "Weapon") {
      throw new Error("Item type is not equipable");
    }
    return this.serviceMap[item.type];
  }
}
