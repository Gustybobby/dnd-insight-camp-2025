import type { IGetActiveTurnsUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";
import type { SessionTurn } from "@/server/domain/models";

export class GetActiveTurnsUseCase implements IGetActiveTurnsUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  invoke(): Promise<SessionTurn[]> {
    return this.activityRepo.getActiveTurns();
  }
}
