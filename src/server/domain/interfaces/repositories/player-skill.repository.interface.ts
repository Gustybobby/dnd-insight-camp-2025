import type { PlayerSkillWithInfo } from "@/server/domain/aggregates/player-skill.aggregate";
import type { PlayerSkill, PlayerSkillCreate } from "@/server/domain/models";

export interface IPlayerSkillRepository {
  getAll({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkillWithInfo[]>;

  create({ data }: { data: PlayerSkillCreate }): Promise<PlayerSkill>;

  delete({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill>;

  deleteAll({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkill[]>;

  playerUseSkill({
    playerId,
    skillId,
  }: Pick<PlayerSkill, "playerId" | "skillId">): Promise<PlayerSkill | null>;

  decrementCooldown({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkill[]>;
}
