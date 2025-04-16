import type { ActivitySession } from "@/server/domain/models";

export interface IGetActivitySessionsUseCase {
  invoke({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession[]>;
}
