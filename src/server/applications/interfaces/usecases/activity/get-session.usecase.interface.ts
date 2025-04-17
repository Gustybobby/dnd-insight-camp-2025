import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";

export interface IGetActivitySessionUseCase {
  invoke({
    sessionId,
  }: {
    sessionId: ActivitySessionAllInfo["id"];
  }): Promise<ActivitySessionAllInfo>;
}
