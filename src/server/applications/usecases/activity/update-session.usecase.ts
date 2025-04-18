import type { IUpdateActivitySessionUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type {
  ActivitySession,
  ActivitySessionUpdate,
} from "@/server/domain/models";

export class UpdateActivitySessionUseCase
  implements IUpdateActivitySessionUseCase
{
  constructor(private readonly activityRepo: IActivityRepository) {}

  async invoke({
    sessionId,
    data,
  }: {
    sessionId: ActivitySession["id"];
    data: ActivitySessionUpdate;
  }): Promise<ActivitySession> {
    return this.activityRepo.updateSession({ sessionId, data });
  }
}
