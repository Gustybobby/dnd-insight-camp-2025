import type { SQL } from "drizzle-orm";
import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type {
  PlayerItemWithInfo,
  PlayerWithCharacter,
  PlayerWithItemsAndEquipments,
} from "@/server/domain/aggregates";
import type {
  Character,
  Player,
  PlayerCreate,
  PlayerStat,
  PlayerStatLogCreate,
  PlayerUpdate,
  User,
} from "@/server/domain/models";

import { db } from "@/db";
import {
  charactersTable,
  itemsTable,
  playerEquipmentsTable,
  playerItemsTable,
  playersTable,
  playerStatLogsTable,
  playerStatsTable,
  usersTable,
} from "@/db/schema";
import { takeOne, takeOneOrThrow } from "@/db/util";
import { and, asc, eq, getTableColumns, sql } from "drizzle-orm";

export class PlayerRepository implements IPlayerRepository {
  async getAllWithCharacter(): Promise<PlayerWithCharacter[]> {
    return db
      .select({
        ...getTableColumns(playersTable),
        character: getTableColumns(charactersTable),
      })
      .from(playersTable)
      .innerJoin(
        charactersTable,
        eq(charactersTable.id, playersTable.characterId),
      )
      .orderBy(asc(playersTable.id));
  }

  async getByIdOrThrow({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<Player> {
    return db
      .select()
      .from(playersTable)
      .where(eq(playersTable.id, playerId))
      .then(takeOneOrThrow);
  }

  async getByUserId({
    userId,
  }: {
    userId: User["id"];
  }): Promise<Player | null> {
    return db
      .select({ ...getTableColumns(playersTable) })
      .from(playersTable)
      .innerJoin(usersTable, eq(usersTable.playerId, playersTable.id))
      .where(eq(usersTable.id, userId))
      .then(takeOne);
  }

  async getCharacterOrThrow({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<Character> {
    return db
      .select(getTableColumns(charactersTable))
      .from(charactersTable)
      .innerJoin(playersTable, eq(playersTable.characterId, charactersTable.id))
      .where(eq(playersTable.id, playerId))
      .then(takeOneOrThrow);
  }

  async getAllStats({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<PlayerStat[]> {
    return db
      .select()
      .from(playerStatsTable)
      .where(eq(playerStatsTable.playerId, playerId));
  }

  async getAllItems({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<PlayerItemWithInfo[]> {
    return db
      .select({
        ...getTableColumns(playerItemsTable),
        item: getTableColumns(itemsTable),
      })
      .from(playerItemsTable)
      .innerJoin(itemsTable, eq(itemsTable.id, playerItemsTable.itemId))
      .where(eq(playerItemsTable.playerId, playerId))
      .orderBy(asc(itemsTable.id));
  }

  async create({ data }: { data: PlayerCreate }): Promise<Player> {
    return db
      .insert(playersTable)
      .values(data)
      .returning()
      .then(takeOneOrThrow);
  }

  async createStat({ data }: { data: PlayerStat }): Promise<PlayerStat> {
    return db
      .insert(playerStatsTable)
      .values(data)
      .returning()
      .then(takeOneOrThrow);
  }

  async update({
    playerId,
    data,
  }: {
    playerId: Player["id"];
    data: PlayerUpdate;
  }): Promise<void> {
    await db
      .update(playersTable)
      .set(data)
      .where(eq(playersTable.id, playerId));
  }

  async updateStat({
    data,
  }: {
    data: PlayerStatLogCreate;
  }): Promise<PlayerStat> {
    return db.transaction(async (tx) => {
      await tx.insert(playerStatLogsTable).values(data);
      return tx
        .update(playerStatsTable)
        .set({ value: sql`${playerStatsTable.value} + ${data.value}` })
        .where(
          and(
            eq(playerStatsTable.type, data.type),
            eq(playerStatsTable.playerId, data.playerId),
          ),
        )
        .returning()
        .then(takeOneOrThrow);
    });
  }

  //Set multiple stats for 1 player
  async setStats({ data }: { data: PlayerStat[] }): Promise<PlayerStat[]> {
    if (data.length === 0) throw new Error("Empty Input");
    const sqlChunks: SQL[] = [];

    sqlChunks.push(sql`(case`);
    for (const stat of data) {
      sqlChunks.push(
        sql`when ${playerStatsTable.type}=${stat.type} then ${stat.value}`,
      );
    }
    sqlChunks.push(sql`else ${playerStatsTable.value} end)`);
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

    return db
      .update(playerStatsTable)
      .set({
        value: finalSql,
      })
      .where(eq(playerStatsTable.playerId, data[0].playerId))
      .returning();
  }

  async removeAllItemsAndEquipments({
    playerId,
  }: {
    playerId: number;
  }): Promise<
    Pick<PlayerWithItemsAndEquipments, "playerItems" | "equipments">
  > {
    return db.transaction(async (tx) => {
      const playerItems = await tx
        .delete(playerItemsTable)
        .where(eq(playerItemsTable.playerId, playerId))
        .returning();

      const equipments = await tx
        .delete(playerEquipmentsTable)
        .where(eq(playerEquipmentsTable.playerId, playerId))
        .returning();

      return { playerItems, equipments };
    });
  }
}
