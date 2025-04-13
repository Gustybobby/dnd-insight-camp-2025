import type { IGetAllActivitiesUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type { Activity } from "@/server/domain/models";

export class GetAllActivitiesUseCase implements IGetAllActivitiesUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  invoke(): Promise<Activity[]> {
    return this.activityRepo.getAll();
  }
}
