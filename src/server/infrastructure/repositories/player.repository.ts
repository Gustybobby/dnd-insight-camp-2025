import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerItemWithInfo } from "@/server/domain/aggregates";
import type {
  Player,
  PlayerCreate,
  PlayerStat,
  User,
} from "@/server/domain/models";

import { db } from "@/db";
import {
  itemsTable,
  playerItemsTable,
  playersTable,
  playerStatsTable,
} from "@/db/schema";
import { takeOne, takeOneOrThrow } from "@/db/util";
import { eq, getTableColumns } from "drizzle-orm";

export class PlayerRepository implements IPlayerRepository {
  async getAll(): Promise<Player[]> {
    return db.select().from(playersTable);
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
      .select()
      .from(playersTable)
      .where(eq(playersTable.userId, userId))
      .then(takeOne);
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
      .where(eq(playerItemsTable.playerId, playerId));
  }

  async create({ data }: { data: PlayerCreate }): Promise<Player> {
    return db
      .insert(playersTable)
      .values(data)
      .returning()
      .then(takeOneOrThrow);
  }

  async createStat({
    playerId,
    type,
  }: {
    playerId: Player["id"];
    type: PlayerStat["type"];
  }): Promise<PlayerStat> {
    return db
      .insert(playerStatsTable)
      .values({ playerId, type })
      .returning()
      .then(takeOneOrThrow);
  }
}
