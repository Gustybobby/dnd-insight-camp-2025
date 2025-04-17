import type { ActivitySession, SessionTurn } from "@/server/domain/models";

export interface ActivitySessionAllInfo extends ActivitySession {
  turns: SessionTurn[];
}
