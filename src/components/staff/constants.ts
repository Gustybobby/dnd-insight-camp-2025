import type { EffectTypeEnum } from "@/server/domain/models/effect.model";

export const DEFAULT_ITEM_AMOUNT = 1;
export const DEFAULT_SKILL_USES = 10;
export const STATS_ARRAY_LOWERCASE = ["", "str", "dex", "chr", "int"];
const pathname = "/asset/props/";
export const VISUAL_EFFECT_NAME_LIST = [
  "Provoked",
  "Fortitude",
  "Charmed",
  "Advantage",
  "Disadvantage",
];

export const VISUAL_EFFECT_LISTS = [
  {
    name: "Provoked",
    description: "",
    image: `${pathname}provoked.png`,
  },
  {
    name: "Fortitude",
    description: "",
    image: `${pathname}fortitude.png`,
  },
  {
    name: "Charmed",
    description: "",
    image: `${pathname}charmed.png`,
  },
  {
    name: "Advantage",
    description: "",
    image: `${pathname}advantage.png`,
  },
  {
    name: "Disadvantage",
    description: "",
    image: `${pathname}disadvantage.png`,
  },
] as StatusType[];

export interface StatusType {
  name: EffectTypeEnum;
  description: string;
  image: string;
}
