import type { Activity, ActivitySession } from "@/server/domain/models";

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
}
