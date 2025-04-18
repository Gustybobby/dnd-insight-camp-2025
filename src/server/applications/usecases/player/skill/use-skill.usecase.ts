import type { IPlayerUseSkillUseCase } from "@/server/applications/interfaces/usecases/player/skill";
import type {
  IActivityRepository,
  IPlayerSkillRepository,
} from "@/server/domain/interfaces/repositories";
import type { PlayerSkill } from "@/server/domain/models";

export class PlayerUseSkillUseCase implements IPlayerUseSkillUseCase {
  constructor(
    private readonly playerSkillRepo: IPlayerSkillRepository,
    private readonly activityRepo: IActivityRepository,
  ) {}

  async invoke({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill | null> {
    const session = await this.activityRepo.getPlayerActiveSession({
      playerId,
    });
    if (
      session.turns.find((turn) => turn.id === session.currentTurnId)
        ?.playerId !== playerId
    ) {
      throw new Error("player cannot use skill outside of their turn");
    }
    console.log("player", playerId, "using skill", skillId);
    const playerSkill = await this.playerSkillRepo.playerUseSkill({
      playerId,
      skillId,
    });
    session.battleLogs.push(
      `player ${playerId} used ${playerSkill?.skill.name}`,
    );
    await this.activityRepo.updateSession({
      sessionId: session.id,
      data: { battleLogs: session.battleLogs },
    });
    return playerSkill;
  }
}
