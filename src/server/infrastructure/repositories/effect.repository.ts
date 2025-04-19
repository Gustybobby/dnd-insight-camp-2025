import type { IEffectRepository } from "@/server/domain/interfaces/repositories";
import type { EffectWithPlayerId } from "@/server/domain/aggregates";
import type {
  Effect,
  EffectCreate,
  ModEffect,
  ModEffectCreate,
  Player,
} from "@/server/domain/models";

import { db } from "@/db";
import { effectsTable, playerStatLogsTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";
import { and, eq, exists, getTableColumns, gt, ne, sql } from "drizzle-orm";

export class EffectRepository implements IEffectRepository {
  async createModEffect({
    data,
  }: {
    data: ModEffectCreate;
  }): Promise<ModEffect> {
    const effect = await db
      .insert(effectsTable)
      .values({ ...data, type: "Mod" })
      .returning()
      .then(takeOneOrThrow);
    return effect as ModEffect;
  }

  async createEffect({ data }: { data: EffectCreate }): Promise<Effect> {
    return db
      .insert(effectsTable)
      .values(data)
      .returning()
      .then(takeOneOrThrow);
  }

  async getAllVisualEffects(): Promise<EffectWithPlayerId[]> {
    return db
      .select({
        ...getTableColumns(effectsTable),
        playerId: playerStatLogsTable.playerId,
      })
      .from(effectsTable)
      .innerJoin(
        playerStatLogsTable,
        eq(playerStatLogsTable.effectId, effectsTable.id),
      )
      .where(and(ne(effectsTable.type, "Mod"), gt(effectsTable.countdown, 0)));
  }

  async getPlayerVisualEffects({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<Effect[]> {
    return db
      .select()
      .from(effectsTable)
      .where(
        and(
          ne(effectsTable.type, "Mod"),
          gt(effectsTable.countdown, 0),
          exists(
            db
              .select()
              .from(playerStatLogsTable)
              .where(
                and(
                  eq(playerStatLogsTable.effectId, effectsTable.id),
                  eq(playerStatLogsTable.playerId, playerId),
                ),
              ),
          ),
        ),
      );
  }

  async clearPlayerVisualEffect({
    playerId,
    effectId,
  }: {
    playerId: Player["id"];
    effectId: Effect["id"];
  }): Promise<void> {
    return db.transaction(async (tx) => {
      await tx
        .delete(playerStatLogsTable)
        .where(
          and(
            eq(playerStatLogsTable.effectId, effectId),
            eq(playerStatLogsTable.playerId, playerId),
          ),
        );
      const effect = await tx
        .delete(effectsTable)
        .where(eq(effectsTable.id, effectId))
        .returning()
        .then(takeOneOrThrow);
      if (effect.type === "Mod") {
        throw new Error("cannot clear mod effect");
      }
    });
  }

  async decrementCountdown({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<void> {
    await db
      .update(effectsTable)
      .set({ countdown: sql`${effectsTable.countdown} - 1` })
      .where(
        and(
          ne(effectsTable.type, "Mod"),
          gt(effectsTable.countdown, 0),
          exists(
            db
              .select()
              .from(playerStatLogsTable)
              .where(
                and(
                  eq(playerStatLogsTable.effectId, effectsTable.id),
                  eq(playerStatLogsTable.playerId, playerId),
                ),
              ),
          ),
        ),
      );
  }

  async setZeroCountdown({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<void> {
    await db
      .update(effectsTable)
      .set({ countdown: 0 })
      .where(
        and(
          ne(effectsTable.type, "Mod"),
          exists(
            db
              .select()
              .from(playerStatLogsTable)
              .where(
                and(
                  eq(playerStatLogsTable.effectId, effectsTable.id),
                  eq(playerStatLogsTable.playerId, playerId),
                ),
              ),
          ),
        ),
      );
  }
}
