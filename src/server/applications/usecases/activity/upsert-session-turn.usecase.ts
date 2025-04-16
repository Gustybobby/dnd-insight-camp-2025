import type { IUpsertSessionTurnUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type { SessionTurn } from "@/server/domain/models";

export class UpsertSessionTurnUseCase implements IUpsertSessionTurnUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  async invoke({
    data,
  }: {
    data: Omit<SessionTurn, "id">;
  }): Promise<SessionTurn> {
    return this.activityRepo.upsertSessionTurn({ data });
  }
}
