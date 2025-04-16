import type { Skill, PlayerSkill } from "@/server/domain/models";

export interface PlayerSkillWithInfo extends PlayerSkill {
  skill: Skill;
}
