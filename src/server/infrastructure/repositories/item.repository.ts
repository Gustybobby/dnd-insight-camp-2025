import type { IItemRepository } from "@/server/domain/interfaces/repositories";
import type { Item } from "@/server/domain/models";

import { db } from "@/db";
import { itemsTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";
import { eq } from "drizzle-orm";

export class ItemRepository implements IItemRepository {
  async getByIdOrThrow({ itemId }: { itemId: Item["id"] }): Promise<Item> {
    return db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.id, itemId))
      .then(takeOneOrThrow);
  }
}
