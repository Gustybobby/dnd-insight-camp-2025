import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { Item, ItemCreate, PlayerItem } from "@/server/domain/models";

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

  async deletePlayerItem({
    playerId,
    itemId,
  }: Omit<PlayerItem, "amount">): Promise<PlayerItem> {
    return db
      .delete(playerItemsTable)
      .where(
        and(
          eq(playerItemsTable.playerId, playerId),
          eq(playerItemsTable.itemId, itemId),
        ),
      )
      .returning()
      .then(takeOneOrThrow);
  }

  async createItem({ data }: { data: ItemCreate }): Promise<Item> {
    return db
      .insert(itemsTable)
      .values({
        ...data,
        image: "/asset/props/gear.png",
      })
      .returning()
      .then(takeOneOrThrow);
  }

  async deleteItem({ itemId }: { itemId: Item["id"] }): Promise<Item> {
    return db
      .delete(itemsTable)
      .where(eq(itemsTable.id, itemId))
      .returning()
      .then(takeOneOrThrow);
  }
}
