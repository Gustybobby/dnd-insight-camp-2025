import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";
import type {
  Activity,
  ActivitySession,
  ActivitySessionUpdate,
  Player,
  SessionTurn,
} from "@/server/domain/models";

export interface IActivityRepository {
  getAll(): Promise<Activity[]>;

  getSessions({
    activityId,
    filterActive,
  }: {
    activityId: ActivitySession["activityId"];
    filterActive?: boolean;
  }): Promise<ActivitySessionAllInfo[]>;

  getActiveTurns(): Promise<SessionTurn[]>;

  getSession({
    sessionId,
  }: {
    sessionId: ActivitySession["id"];
  }): Promise<ActivitySessionAllInfo>;

  getPlayerActiveSession({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<ActivitySessionAllInfo>;

  createSession({
    activityId,
  }: {
    activityId: ActivitySession["activityId"];
  }): Promise<ActivitySession>;

  updateSession({
    sessionId,
    data,
  }: {
    sessionId: ActivitySession["id"];
    data: ActivitySessionUpdate;
  }): Promise<ActivitySession>;

  upsertSessionTurn({
    data,
  }: {
    data: Omit<SessionTurn, "id">;
  }): Promise<SessionTurn>;

  updateNextTurn({
    sessionId,
  }: {
    sessionId: ActivitySession["id"];
  }): Promise<void>;
}
