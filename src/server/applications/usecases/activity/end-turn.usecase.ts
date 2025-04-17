import type { IEndTurnUseCase } from "@/server/applications/interfaces/usecases/activity";
import type { IActivityRepository } from "@/server/domain/interfaces/repositories";

export class EndTurnUseCase implements IEndTurnUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  async invoke({
    playerId,
    sessionId,
    isBoss,
  }: {
    playerId: number;
    sessionId: number;
    isBoss?: boolean;
  }): Promise<void> {
    const session = await this.activityRepo.getSession({ sessionId });
    const playerTurn = session.turns.find((turn) => turn.playerId === playerId);
    if (!isBoss && session.currentTurnId !== playerTurn?.id) {
      throw new Error(`not player ${playerId} turn`);
    }
    return this.activityRepo.updateNextTurn({ sessionId });
  }
}
