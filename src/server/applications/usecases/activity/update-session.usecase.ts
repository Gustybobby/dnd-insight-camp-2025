import type { IUpdateActivitySessionUseCase } from "@/server/applications/interfaces/usecases/activity";
import type {
  IActivityRepository,
  IEffectRepository,
  IPlayerSkillRepository,
} from "@/server/domain/interfaces/repositories";
import type {
  ActivitySession,
  ActivitySessionUpdate,
} from "@/server/domain/models";

export class UpdateActivitySessionUseCase
  implements IUpdateActivitySessionUseCase
{
  constructor(
    private readonly playerSkillRepo: IPlayerSkillRepository,
    private readonly activityRepo: IActivityRepository,
    private readonly effectRepo: IEffectRepository,
  ) {}

  async invoke({
    sessionId,
    data,
  }: {
    sessionId: ActivitySession["id"];
    data: ActivitySessionUpdate;
  }): Promise<ActivitySession> {
    if (data.isActive === false) {
      const { turns } = await this.activityRepo.getSession({ sessionId });
      await Promise.all(
        turns.map((turn) =>
          this.playerSkillRepo.setZeroCooldown({ playerId: turn.playerId }),
        ),
      );
      await Promise.all(
        turns.map((turn) =>
          this.effectRepo.setZeroCountdown({ playerId: turn.playerId }),
        ),
      );
    }

    return this.activityRepo.updateSession({ sessionId, data });
  }
}
