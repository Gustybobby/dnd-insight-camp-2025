import type { IEndTurnUseCase } from "@/server/applications/interfaces/usecases/activity";
import type {
  IActivityRepository,
  IPlayerSkillRepository,
} from "@/server/domain/interfaces/repositories";

export class EndTurnUseCase implements IEndTurnUseCase {
  constructor(
    private readonly activityRepo: IActivityRepository,
    private readonly playerSkillRepo: IPlayerSkillRepository,
  ) {}

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

    if (!isBoss) {
      const playerTurn = session.turns.find(
        (turn) => turn.playerId === playerId,
      );
      if (session.currentTurnId !== playerTurn?.id) {
        throw new Error(`not player ${playerId} turn`);
      }
    }

    await this.activityRepo.updateNextTurn({ sessionId });

    const updatedSession = await this.activityRepo.getSession({ sessionId });

    const nextPlayerId = updatedSession.turns.find(
      (turn) => turn.id === updatedSession.currentTurnId,
    )?.playerId;

    if (nextPlayerId) {
      await this.playerSkillRepo.decrementCooldown({ playerId: nextPlayerId });
    }
  }
}
