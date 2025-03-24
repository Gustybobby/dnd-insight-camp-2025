import type {
  IEffectService,
  IEquipmentService,
  IItemService,
} from "@/server/applications/interfaces/services/applications";
import type {
  IEquipmentRepository,
  IItemRepository,
} from "@/server/domain/interfaces/repositories";
import type {
  EquipmentPartEnum,
  PlayerEquipment,
} from "@/server/domain/models";

interface EquipmentConfig {
  part: EquipmentPartEnum;
}

export class BaseEquipmentService implements IEquipmentService {
  constructor(
    public readonly config: EquipmentConfig,
    protected readonly equipmentRepo: IEquipmentRepository,
    protected readonly itemRepo: IItemRepository,
    protected readonly itemService: IItemService,
    protected readonly effectService: IEffectService,
  ) {}

  async onEquip({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<PlayerEquipment> {
    if (
      await this.equipmentRepo.playerEquipmentExists({
        playerId,
        part: this.config.part,
      })
    ) {
      throw new Error(`${this.config.part} is already equipped`);
    }

    return this.equipmentRepo.playerEquip({
      data: { playerId, itemId, part: this.config.part },
    });
  }

  async onActive(): Promise<void> {}

  async onRemove({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void> {
    return this.equipmentRepo.playerRemove({ playerId, itemId });
  }

  protected async modStats({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void> {
    const item = await this.itemRepo.getByIdOrThrow({ itemId });
    await this.itemService.getGivenStats(item).then((stats) =>
      Promise.all(
        stats.map((stat) =>
          this.effectService.createAndApplyModEffect({
            data: { itemId, stat: stat.type, value: stat.value },
            playerIds: [playerId],
            staffId: null,
          }),
        ),
      ),
    );
  }

  protected async revertStats({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void> {
    const item = await this.itemRepo.getByIdOrThrow({ itemId });
    await this.itemService.getGivenStats(item).then((stats) =>
      Promise.all(
        stats.map((stat) =>
          this.effectService.createAndApplyModEffect({
            data: { itemId, stat: stat.type, value: -1 * stat.value },
            playerIds: [playerId],
            staffId: null,
          }),
        ),
      ),
    );
  }
}
