import type {
  Skill,
  PlayerSkill,
  PlayerSkillCreate,
} from "@/server/domain/models";
import { PlayerSkillWithInfo } from "@/server/domain/aggregates/player-skill.aggregate";

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
