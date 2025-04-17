import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";
import type {
  Activity,
  ActivitySession,
  SessionTurn,
} from "@/server/domain/models";

import { db } from "@/db";
import {
  activitiesTable,
  activitySessionsTable,
  sessionTurnsTable,
} from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";
import { and, eq, getTableColumns, inArray } from "drizzle-orm";

export class ActivityRepository implements IActivityRepository {
  async getAll(): Promise<Activity[]> {
    return db.select().from(activitiesTable);
  }

  async getSessions({
    activityId,
    filterActive,
  }: {
    activityId: ActivitySession["activityId"];
    filterActive?: boolean;
  }): Promise<ActivitySessionAllInfo[]> {
    const sessions = await db
      .select()
      .from(activitySessionsTable)
      .where(
        and(
          eq(activitySessionsTable.activityId, activityId),
          filterActive ? eq(activitySessionsTable.isActive, true) : undefined,
        ),
      );
    const turns = await db
      .select()
      .from(sessionTurnsTable)
      .where(
        inArray(
          sessionTurnsTable.sessionId,
          sessions.map((session) => session.id),
        ),
      );
    return sessions.map((session) => ({
      ...session,
      turns: turns.filter((turn) => turn.sessionId === session.id),
    }));
  }

  async getActiveTurns(): Promise<SessionTurn[]> {
    return db
      .select({ ...getTableColumns(sessionTurnsTable) })
      .from(sessionTurnsTable)
      .innerJoin(
        activitySessionsTable,
        eq(activitySessionsTable.id, sessionTurnsTable.sessionId),
      )
      .where(eq(activitySessionsTable.isActive, true));
  }

  async getSession({
    sessionId,
  }: {
    sessionId: ActivitySession["id"];
  }): Promise<ActivitySessionAllInfo> {
    const [session, turns] = await Promise.all([
      db
        .select()
        .from(activitySessionsTable)
        .where(eq(activitySessionsTable.id, sessionId))
        .then(takeOneOrThrow),
      db
        .select()
        .from(sessionTurnsTable)
        .where(eq(sessionTurnsTable.sessionId, sessionId)),
    ]);
    return { ...session, turns };
  }

  async createSession({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession> {
    return db
      .insert(activitySessionsTable)
      .values({ activityId })
      .returning()
      .then(takeOneOrThrow);
  }

  async upsertSessionTurn({
    data,
  }: {
    data: Omit<SessionTurn, "id">;
  }): Promise<SessionTurn> {
    return db
      .insert(sessionTurnsTable)
      .values(data)
      .onConflictDoUpdate({
        target: sessionTurnsTable.id,
        set: { order: data.order },
      })
      .returning()
      .then(takeOneOrThrow);
  }
}
