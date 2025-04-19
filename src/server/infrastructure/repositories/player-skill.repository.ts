import type { IPlayerSkillRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerSkillWithInfo } from "@/server/domain/aggregates";
import type {
  ActivitySession,
  PlayerSkill,
  PlayerSkillCreate,
} from "@/server/domain/models";

import { db } from "@/db";
import { playerSkillsTable, sessionTurnsTable, skillsTable } from "@/db/schema";
import { takeOne, takeOneOrThrow } from "@/db/util";
import {
  and,
  asc,
  eq,
  exists,
  getTableColumns,
  gt,
  inArray,
  isNotNull,
  isNull,
  lt,
  sql,
} from "drizzle-orm";

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
      .where(eq(playerSkillsTable.playerId, playerId))
      .orderBy(asc(skillsTable.name));
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
  }: Pick<
    PlayerSkill,
    "playerId" | "skillId"
  >): Promise<PlayerSkillWithInfo | null> {
    const skill = await db
      .select()
      .from(skillsTable)
      .where(eq(skillsTable.id, skillId))
      .limit(1)
      .then(takeOneOrThrow);
    const playerSkill = await db
      .update(playerSkillsTable)
      .set({ cooldown: skill.cooldown })
      .where(
        and(
          eq(playerSkillsTable.playerId, playerId),
          eq(playerSkillsTable.skillId, skillId),
          lt(playerSkillsTable.cooldown, 1),
        ),
      )
      .returning()
      .then(takeOne);
    return playerSkill ? { ...playerSkill, skill } : null;
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
          isNotNull(
            db
              .select({ cooldownCycleRef: skillsTable.cooldownCycleRef })
              .from(skillsTable)
              .where(eq(skillsTable.id, playerSkillsTable.skillId)),
          ),
        ),
      )
      .returning();
  }

  async decrementBossRefCooldown({
    sessionId,
  }: {
    sessionId: ActivitySession["id"];
  }): Promise<void> {
    await db
      .update(playerSkillsTable)
      .set({
        cooldown: sql`${playerSkillsTable.cooldown}-1`,
      })
      .where(
        and(
          gt(playerSkillsTable.cooldown, 0),
          inArray(
            playerSkillsTable.skillId,
            db
              .select({ id: skillsTable.id })
              .from(skillsTable)
              .where(isNull(skillsTable.cooldownCycleRef)),
          ),
          exists(
            db
              .select({ id: sessionTurnsTable.id })
              .from(sessionTurnsTable)
              .where(
                and(
                  eq(sessionTurnsTable.sessionId, sessionId),
                  eq(sessionTurnsTable.playerId, playerSkillsTable.playerId),
                ),
              ),
          ),
        ),
      );
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
