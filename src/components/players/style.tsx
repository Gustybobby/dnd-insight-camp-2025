import type { StatTypeEnum } from "@/server/domain/models";

export const STAT_STYLE_MAP: Record<
  StatTypeEnum,
  { label: string; color: string }
> = {
  Str: { label: "Strength", color: "bg-oldpurple" },
  Dex: { label: "Dexterity", color: "bg-cyan-700" },
  Chr: { label: "Charisma", color: "bg-lightorange" },
  Int: { label: "Intelligence", color: "bg-orange-500" },
  HP: { label: "Health", color: "bg-red-500" },
};

export const clientOrderedStatTypes = [
  "Str",
  "Dex",
  "Chr",
  "Int",
] as const satisfies StatTypeEnum[];
