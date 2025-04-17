import type {
  IEquipmentRepository,
  IItemRepository,
} from "@/server/domain/interfaces/repositories";
import type {
  IEffectService,
  IEquipmentService,
  IItemService,
} from "@/server/domain/interfaces/services/applications";
import type { Item, ItemTypeEnum } from "@/server/domain/models";

import { NormalArmorService } from "@/server/domain/services/equipments/normal-armor.service";
import { NormalGearService } from "@/server/domain/services/equipments/normal-gear.service";
import { NormalWeaponService } from "@/server/domain/services/equipments/normal-weapon.service";

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
      Weapon: new NormalWeaponService(
        equipmentRepo,
        itemRepo,
        itemService,
        effectService,
      ),
      Gear: new NormalGearService(
        equipmentRepo,
        itemRepo,
        itemService,
        effectService,
      ),
    };
  }

  async use({ itemId }: { itemId: Item["id"] }) {
    const item = await this.itemRepo.getByIdOrThrow({ itemId });
    if (
      item.type !== "Armor" &&
      item.type !== "Weapon" &&
      item.type !== "Gear"
    ) {
      throw new Error("Item type is not equipable");
    }
    return this.serviceMap[item.type];
  }
}
