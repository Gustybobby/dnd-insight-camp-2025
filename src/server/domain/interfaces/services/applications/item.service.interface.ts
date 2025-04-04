import type { Item, StatTypeEnum } from "@/server/domain/models";

export interface ItemGivenStat {
  type: StatTypeEnum;
  value: number;
}

export interface IItemService {
  getGivenStats(item: Item): Promise<ItemGivenStat[]>;
}
