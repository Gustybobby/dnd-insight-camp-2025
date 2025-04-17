import type { IGetActivitySessionUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";

export class GetActivitySessionUseCase implements IGetActivitySessionUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  invoke({
    sessionId,
  }: {
    sessionId: ActivitySessionAllInfo["id"];
  }): Promise<ActivitySessionAllInfo> {
    return this.activityRepo.getSession({ sessionId });
  }
}
