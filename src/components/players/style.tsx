import type { StatTypeEnum } from "@/server/domain/models";

interface StatStyle {
  label: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
  description: string;
}

export const STAT_STYLE_MAP: Record<StatTypeEnum, StatStyle> = {
  Str: {
    label: "Strength",
    iconColor: "bg-radial-gradient from-strcolor-in to-strcolor-out",
    bgColor: "bg-strcolor",
    textColor: "text-strcolor",
    description: `“Raw physical power and brute force.”
Affects melee attack power, carry weight, and physical feats like breaking objects or pushing enemies. Characters with high Strength excel in close combat and heavy weapon usage.`,
  },
  Dex: {
    label: "Dexterity",
    iconColor: "bg-radial-gradient from-dexcolor-in to-dexcolor-out",
    bgColor: "bg-dexcolor",
    textColor: "text-dexcolor",
    description: `“Speed, agility, and precision.”
Determines evasion, ranged attack accuracy, and the ability to pick locks or avoid traps. Dexterous characters move quickly, strike with finesse, and are harder to hit.`,
  },
  Chr: {
    label: "Charisma",
    iconColor: "bg-radial-gradient from-chrcolor-in to-chrcolor-out",
    bgColor: "bg-chrcolor",
    textColor: "text-chrcolor",
    description: `“Force of personality, charm, and leadership.”
Influences social interactions, persuasion, intimidation, and the ability to lead or rally allies. High Charisma can open dialogue paths, enhance negotiation, or even demoralize foes.`,
  },
  Int: {
    label: "Intelligence",
    iconColor: "bg-radial-gradient from-intcolor-in to-intcolor-out",
    bgColor: "bg-intcolor",
    textColor: "text-intcolor",
    description: `"The measure of knowledge, logic, and magical aptitude."
Determines a character’s ability to solve puzzles, decipher ancient scripts, recall lore, and cast or resist spells. High Intelligence enhances magic damage, skill effectiveness, and knowledge-based checks.`,
  },
  HP: {
    label: "Health",
    iconColor: "bg-red-500",
    bgColor: "bg-red-500",
    textColor: "text-red-500",
    description: `“The measure of vitality, endurance, and the will to survive.”
Represents a character’s life force and ability to withstand damage. High Health allows characters to endure longer in battle, shrug off injuries, and resist fatigue. When Health reaches zero, the character falls — whether unconscious, dying, or worse.`,
  },
};
