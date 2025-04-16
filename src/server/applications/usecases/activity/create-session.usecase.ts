import type { ICreateActivitySessionUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type { ActivitySession } from "@/server/domain/models";

export class CreateActivitySessionUseCase
  implements ICreateActivitySessionUseCase
{
  constructor(private readonly activityRepo: IActivityRepository) {}

  invoke({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession> {
    return this.activityRepo.createSession({ activityId });
  }
}
