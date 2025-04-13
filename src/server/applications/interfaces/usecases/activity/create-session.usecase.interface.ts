import type { ActivitySession } from "@/server/domain/models";

export interface ICreateActivitySessionUseCase {
  invoke({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession>;
}
