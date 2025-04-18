import type { PlayerSkillWithInfo } from "@/server/domain/aggregates/player-skill.aggregate";
import type { PlayerSkill, PlayerSkillCreate } from "@/server/domain/models";

export interface IPlayerSkillRepository {
  getAllPlayers(): Promise<PlayerSkillWithInfo[]>;

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
  }: Pick<
    PlayerSkill,
    "playerId" | "skillId"
  >): Promise<PlayerSkillWithInfo | null>;

  decrementCooldown({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<PlayerSkill[]>;

  setZeroCooldown({
    playerId,
  }: {
    playerId: PlayerSkill["playerId"];
  }): Promise<void>;
}
