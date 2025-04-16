import type { PlayerSkill, Skill } from "@/server/domain/models";

export interface PlayerSkillWithInfo extends PlayerSkill {
  skill: Skill;
}
