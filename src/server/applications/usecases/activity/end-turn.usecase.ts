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
    if (isBoss) {
      await this.activityRepo.updateNextTurn({ sessionId });
      return;
    }
    const playerTurn = session.turns.find((turn) => turn.playerId === playerId);
    if (session.currentTurnId !== playerTurn?.id) {
      throw new Error(`not player ${playerId} turn`);
    }
    await this.activityRepo.updateNextTurn({ sessionId });
    await this.playerSkillRepo.decrementCooldown({ playerId });
  }
}
