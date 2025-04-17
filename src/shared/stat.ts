import type { StatTypeEnum } from "@/server/domain/models";

export const ORDERED_STAT_TYPES = [
  "Str",
  "Dex",
  "Chr",
  "Int",
] as const satisfies StatTypeEnum[];

export const ALL_STAT_TYPES = [
  "Str",
  "Dex",
  "Chr",
  "Int",
  "HP",
] as const satisfies StatTypeEnum[];
export const DEFAULT_STAT_VALUES = [0, 0, 0, 0, 200];
