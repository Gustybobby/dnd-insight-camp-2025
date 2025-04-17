import type { SessionTurn } from "@/server/domain/models";

export interface IGetActiveTurnsUseCase {
  invoke(): Promise<SessionTurn[]>;
}
