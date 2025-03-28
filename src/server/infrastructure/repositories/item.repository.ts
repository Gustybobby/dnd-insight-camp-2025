import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { Item, PlayerItem } from "@/server/domain/models";

import { db } from "@/db";
import { itemsTable, playerItemsTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";
import { and, eq, sql } from "drizzle-orm";

export class ItemRepository implements IItemRepository {
  async getAll(): Promise<Item[]> {
    return db.select().from(itemsTable);
  }

  async getByIdOrThrow({ itemId }: { itemId: Item["id"] }): Promise<Item> {
    return db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.id, itemId))
      .then(takeOneOrThrow);
  }

  async createPlayerItem({ data }: { data: PlayerItem }): Promise<PlayerItem> {
    return db
      .insert(playerItemsTable)
      .values(data)
      .returning()
      .catch(() =>
        db
          .update(playerItemsTable)
          .set({ amount: sql`${playerItemsTable.amount} + ${data.amount}` })
          .where(
            and(
              eq(playerItemsTable.playerId, data.playerId),
              eq(playerItemsTable.itemId, data.itemId),
            ),
          )
          .returning(),
      )
      .then(takeOneOrThrow);
  }
}
