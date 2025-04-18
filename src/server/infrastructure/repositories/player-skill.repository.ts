import type { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkillWithInfo } from "@/server/domain/aggregates";
import type { PlayerSkill, PlayerSkillCreate } from "@/server/domain/models";

import { db } from "@/db";
import { playerSkillsTable, skillsTable } from "@/db/schema";
import { takeOne, takeOneOrThrow } from "@/db/util";
import { and, eq, getTableColumns, gt, lt, sql } from "drizzle-orm";

export class PlayerSkillRepository implements IPlayerSkillRepository {
  async getAllPlayers(): Promise<PlayerSkillWithInfo[]> {
    return db
      .select({
        ...getTableColumns(playerSkillsTable),
        skill: getTableColumns(skillsTable),
      })
      .from(playerSkillsTable)
      .innerJoin(skillsTable, eq(playerSkillsTable.skillId, skillsTable.id));
  }

  async getAll({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkillWithInfo[]> {
    return db
      .select({
        ...getTableColumns(playerSkillsTable),
        skill: getTableColumns(skillsTable),
      })
      .from(playerSkillsTable)
      .innerJoin(skillsTable, eq(playerSkillsTable.skillId, skillsTable.id))
      .where(eq(playerSkillsTable.playerId, playerId));
  }

  async create({ data }: { data: PlayerSkillCreate }): Promise<PlayerSkill> {
    return db
      .insert(playerSkillsTable)
      .values(data)
      .returning()
      .then(takeOneOrThrow);
  }

  async delete({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill> {
    return db
      .delete(playerSkillsTable)
      .where(
        and(
          eq(playerSkillsTable.playerId, playerId),
          eq(playerSkillsTable.skillId, skillId),
        ),
      )
      .returning()
      .then(takeOneOrThrow);
  }

  async deleteAll({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkill[]> {
    return db
      .delete(playerSkillsTable)
      .where(eq(playerSkillsTable.playerId, playerId))
      .returning();
  }

  async playerUseSkill({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill | null> {
    const playerSkill = await db
      .update(playerSkillsTable)
      .set({ cooldown: skillsTable.cooldown })
      .from(skillsTable)
      .where(
        and(
          eq(playerSkillsTable.playerId, playerId),
          eq(playerSkillsTable.skillId, skillId),
          lt(playerSkillsTable.cooldown, 1),
        ),
      )
      .returning()
      .then(takeOne);
    return playerSkill;
  }

  async decrementCooldown({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkill[]> {
    return db
      .update(playerSkillsTable)
      .set({
        cooldown: sql`${playerSkillsTable.cooldown}-1`,
      })
      .where(
        and(
          eq(playerSkillsTable.playerId, playerId),
          gt(playerSkillsTable.cooldown, 0),
        ),
      )
      .returning();
  }

  async setZeroCooldown({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<void> {
    await db
      .update(playerSkillsTable)
      .set({ cooldown: 0 })
      .where(eq(playerSkillsTable.playerId, playerId));
  }
}
