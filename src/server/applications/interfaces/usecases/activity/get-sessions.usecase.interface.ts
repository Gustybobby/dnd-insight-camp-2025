import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";
import type { ActivitySession } from "@/server/domain/models";

export interface IGetActivitySessionsUseCase {
  invoke({
    activityId,
    filterActive,
  }: {
    activityId: ActivitySession["activityId"];
    filterActive?: boolean;
  }): Promise<ActivitySessionAllInfo[]>;
}
