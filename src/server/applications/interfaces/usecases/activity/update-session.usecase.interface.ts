import type {
  ActivitySession,
  ActivitySessionUpdate,
} from "@/server/domain/models";

export interface IUpdateActivitySessionUseCase {
  invoke({
    sessionId,
    data,
  }: {
    sessionId: ActivitySession["id"];
    data: ActivitySessionUpdate;
  }): Promise<ActivitySession>;
}
