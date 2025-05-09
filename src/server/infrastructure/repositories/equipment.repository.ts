import type { IEquipmentRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type { PlayerEquipment } from "@/server/domain/models";

import { db } from "@/db";
import {
  itemsTable,
  playerEquipmentsTable,
  playerItemsTable,
} from "@/db/schema";
import { takeOne, takeOneOrThrow } from "@/db/util";
import { and, eq, getTableColumns } from "drizzle-orm";

export class EquipmentRepository implements IEquipmentRepository {
  async getAll(): Promise<PlayerEquipmentWithInfo[]> {
    return db
      .select({
        ...getTableColumns(playerEquipmentsTable),
        item: getTableColumns(itemsTable),
      })
      .from(playerEquipmentsTable)
      .innerJoin(itemsTable, eq(itemsTable.id, playerEquipmentsTable.itemId));
  }

  async getPlayerEquipments({
    playerId,
  }: {
    playerId: PlayerEquipmentWithInfo["playerId"];
  }): Promise<PlayerEquipmentWithInfo[]> {
    return db
      .select({
        ...getTableColumns(playerEquipmentsTable),
        item: getTableColumns(itemsTable),
      })
      .from(playerEquipmentsTable)
      .innerJoin(itemsTable, eq(itemsTable.id, playerEquipmentsTable.itemId))
      .where(eq(playerEquipmentsTable.playerId, playerId));
  }

  async playerEquipmentExists({
    playerId,
    part,
  }: Pick<PlayerEquipment, "playerId" | "part">): Promise<boolean> {
    return db
      .select({ itemId: playerEquipmentsTable.itemId })
      .from(playerEquipmentsTable)
      .where(
        and(
          eq(playerEquipmentsTable.playerId, playerId),
          eq(playerEquipmentsTable.part, part),
        ),
      )
      .then(takeOne)
      .then((res) => !!res);
  }

  playerEquip({ data }: { data: PlayerEquipment }): Promise<PlayerEquipment> {
    return db.transaction(async (tx) => {
      const { rowCount } = await tx
        .delete(playerItemsTable)
        .where(
          and(
            eq(playerItemsTable.playerId, data.playerId),
            eq(playerItemsTable.itemId, data.itemId),
          ),
        );
      if (!rowCount) {
        throw new Error("item not found");
      }
      return tx
        .insert(playerEquipmentsTable)
        .values(data)
        .returning()
        .then(takeOneOrThrow);
    });
  }

  playerRemove({
    playerId,
    itemId,
  }: Pick<PlayerEquipment, "playerId" | "itemId">): Promise<void> {
    return db.transaction(async (tx) => {
      const { rowCount } = await tx
        .delete(playerEquipmentsTable)
        .where(
          and(
            eq(playerEquipmentsTable.playerId, playerId),
            eq(playerEquipmentsTable.itemId, itemId),
          ),
        );
      if (!rowCount) {
        throw new Error("equipment not found");
      }
      await tx
        .insert(playerItemsTable)
        .values({ playerId, itemId, amount: 1 })
        .onConflictDoUpdate({
          target: [playerItemsTable.itemId, playerItemsTable.playerId],
          set: { amount: 1 },
        });
    });
  }
}
