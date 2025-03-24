import type {
  IItemService,
  ItemGivenStat,
} from "@/server/applications/interfaces/services/applications";
import type { Item } from "@/server/domain/models";

import { StatTypeEnum } from "@/server/domain/models";

import { z } from "zod";

export class ItemService implements IItemService {
  private readonly STAT_TEXT_DELIMITER = ":";

  async getGivenStats(item: Item): Promise<ItemGivenStat[]> {
    return item.stats
      .map((statText) => statText.split(this.STAT_TEXT_DELIMITER))
      .map(([type, value]) => ({
        type: StatTypeEnum.parse(type),
        value: z.coerce.number().parse(value.trim()),
      }));
  }
}
