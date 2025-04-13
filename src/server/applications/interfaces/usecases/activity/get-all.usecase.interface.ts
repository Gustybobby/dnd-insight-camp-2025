import type { Activity } from "@/server/domain/models";

export interface IGetAllActivitiesUseCase {
  invoke(): Promise<Activity[]>;
}
