import type {
  Activity,
  ActivitySession,
  SessionTurn,
} from "@/server/domain/models";

export interface IActivityRepository {
  getAll(): Promise<Activity[]>;

  getSessions({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession[]>;

  createSession({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession>;

  upsertSessionTurn({
    data,
  }: {
    data: Omit<SessionTurn, "id">;
  }): Promise<SessionTurn>;
}
