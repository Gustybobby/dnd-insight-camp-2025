import type { StatTypeEnum } from "@/server/domain/models";

export const STAT_TEXT_STYLE_MAP: Record<
  StatTypeEnum,
  { label: string; color: string }
> = {
  Str: { label: "Strength", color: "text-oldpurple" },
  Dex: { label: "Dexterity", color: "text-cyan-700" },
  Chr: { label: "Charisma", color: "text-lightorange" },
  Int: { label: "Intelligence", color: "text-orange-500" },
  HP: { label: "Health", color: "text-red-500" },
};
