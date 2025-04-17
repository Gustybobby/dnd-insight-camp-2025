import type { IGetActivitySessionsUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";
import type { ActivitySession } from "@/server/domain/models";

export class GetActivitySessionsUseCase implements IGetActivitySessionsUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  invoke({
    activityId,
    filterActive,
  }: {
    activityId: ActivitySession["activityId"];
    filterActive?: boolean;
  }): Promise<ActivitySessionAllInfo[]> {
    return this.activityRepo.getSessions({ activityId, filterActive });
  }
}
