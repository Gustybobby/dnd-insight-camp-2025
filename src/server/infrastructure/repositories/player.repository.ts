import type { IPlayerRepository } from "@/server/domain/interfaces/repositories";
import type {
  PlayerItemWithInfo,
  PlayerWithCharater,
} from "@/server/domain/aggregates";
import type {
  Character,
  Player,
  PlayerCreate,
  PlayerStat,
  PlayerStatLogCreate,
  User,
} from "@/server/domain/models";

import { db } from "@/db";
import {
  charactersTable,
  itemsTable,
  playerItemsTable,
  playersTable,
  playerStatLogsTable,
  playerStatsTable,
} from "@/db/schema";
import { takeOne, takeOneOrThrow } from "@/db/util";
import { and, asc, eq, getTableColumns, sql } from "drizzle-orm";

export class PlayerRepository implements IPlayerRepository {
  async getAllWithCharacter(): Promise<PlayerWithCharater[]> {
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
      .select()
      .from(playersTable)
      .where(eq(playersTable.userId, userId))
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
}
