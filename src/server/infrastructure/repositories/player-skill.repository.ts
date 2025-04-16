import type { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkill, PlayerSkillCreate } from "@/server/domain/models";
import type { PlayerSkillWithInfo } from "@/server/domain/aggregates";

import { db } from "@/db";
import { playerSkillsTable, skillsTable } from "@/db/schema";
import { eq, getTableColumns, and, lt, gt, sql } from "drizzle-orm";
import { takeOne, takeOneOrThrow } from "@/db/util";

export class PlayerSkillRepository implements IPlayerSkillRepository {
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
    return db
      .update(playerSkillsTable)
      .set({
        cooldown: skillsTable.cooldown,
        remainingUses: sql`${playerSkillsTable.remainingUses}-1`,
      })
      .from(playerSkillsTable)
      .innerJoin(skillsTable, eq(playerSkillsTable.skillId, skillsTable.id))
      .where(
        and(
          eq(playerSkillsTable.playerId, playerId),
          eq(playerSkillsTable.skillId, skillId),
          lt(playerSkillsTable.cooldown, 1),
          gt(playerSkillsTable.remainingUses, 0),
        ),
      )
      .returning()
      .then(takeOne);
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
      .from(playerSkillsTable)
      .where(
        and(
          eq(playerSkillsTable.playerId, playerId),
          gt(playerSkillsTable.cooldown, 0),
        ),
      )
      .returning();
  }
}
