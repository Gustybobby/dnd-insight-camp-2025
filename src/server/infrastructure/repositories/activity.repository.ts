import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
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
import { eq } from "drizzle-orm";

export class ActivityRepository implements IActivityRepository {
  async getAll(): Promise<Activity[]> {
    return db.select().from(activitiesTable);
  }

  async getSessions({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession[]> {
    return db
      .select()
      .from(activitySessionsTable)
      .where(eq(activitySessionsTable.activityId, activityId));
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
