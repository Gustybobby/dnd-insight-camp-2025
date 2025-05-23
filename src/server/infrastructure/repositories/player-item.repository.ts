import type { IPlayerItemRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerItemWithInfo } from "@/server/domain/aggregates";

import { db } from "@/db";
import { itemsTable, playerItemsTable } from "@/db/schema";
import { eq, getTableColumns } from "drizzle-orm";

export class PlayerItemRepository implements IPlayerItemRepository {
  async getAll(): Promise<PlayerItemWithInfo[]> {
    return db
      .select({
        ...getTableColumns(playerItemsTable),
        item: getTableColumns(itemsTable),
      })
      .from(playerItemsTable)
      .innerJoin(itemsTable, eq(itemsTable.id, playerItemsTable.itemId));
  }
}
