import type { SessionTurn } from "@/server/domain/models";

export interface IUpsertSessionTurnUseCase {
  invoke({ data }: { data: Omit<SessionTurn, "id"> }): Promise<SessionTurn>;
}
