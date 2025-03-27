import type { IPlayerStatLogRepository } from "@/server/domain/interfaces/repositories";
import type {
  PlayerStatLogFullInfo,
  PlayerStatLogFullInfoPlusPlayerCharacter,
} from "@/server/domain/aggregates";
import type { PlayerStatLog } from "@/server/domain/models";

import { db } from "@/db";
import {
  charactersTable,
  effectsTable,
  itemsTable,
  playersTable,
  playerStatLogsTable,
  staffsTable,
  usersTable,
} from "@/db/schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";

export class PlayerStatLogRepository implements IPlayerStatLogRepository {
  async getAllWithFullInfoPlus(): Promise<
    PlayerStatLogFullInfoPlusPlayerCharacter[]
  > {
    return db
      .select({
        ...getTableColumns(playerStatLogsTable),
        staff: getTableColumns(usersTable),
        effect: getTableColumns(effectsTable),
        item: getTableColumns(itemsTable),
        player: getTableColumns(playersTable),
        character: getTableColumns(charactersTable),
      })
      .from(playerStatLogsTable)
      .innerJoin(
        playersTable,
        eq(playerStatLogsTable.playerId, playersTable.id),
      )
      .innerJoin(
        charactersTable,
        eq(playersTable.characterId, charactersTable.id),
      )
      .leftJoin(staffsTable, eq(staffsTable.id, playerStatLogsTable.staffId))
      .leftJoin(usersTable, eq(usersTable.id, staffsTable.userId))
      .leftJoin(effectsTable, eq(effectsTable.id, playerStatLogsTable.effectId))
      .leftJoin(itemsTable, eq(itemsTable.id, effectsTable.itemId))
      .orderBy(desc(playerStatLogsTable.createdAt));
  }

  async getMany({
    limit,
    playerId,
    effectId,
  }: {
    limit: number;
    playerId?: PlayerStatLog["playerId"];
    effectId?: PlayerStatLog["effectId"];
  }): Promise<PlayerStatLogFullInfo[]> {
    return db
      .select({
        ...getTableColumns(playerStatLogsTable),
        staff: getTableColumns(usersTable),
        effect: getTableColumns(effectsTable),
        item: getTableColumns(itemsTable),
      })
      .from(playerStatLogsTable)
      .leftJoin(staffsTable, eq(staffsTable.id, playerStatLogsTable.staffId))
      .leftJoin(usersTable, eq(usersTable.id, staffsTable.userId))
      .leftJoin(effectsTable, eq(effectsTable.id, playerStatLogsTable.effectId))
      .leftJoin(itemsTable, eq(itemsTable.id, effectsTable.itemId))
      .where(
        and(
          playerId ? eq(playerStatLogsTable.playerId, playerId) : undefined,
          effectId ? eq(playerStatLogsTable.effectId, effectId) : undefined,
        ),
      )
      .orderBy(desc(playerStatLogsTable.createdAt))
      .limit(limit);
  }
}
