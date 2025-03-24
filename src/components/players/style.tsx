import type { StatTypeEnum } from "@/server/domain/models";

export const STAT_STYLE_MAP: Record<
  StatTypeEnum,
  { label: string; color: string; description: string }
> = {
  Str: {
    label: "Strength",
    color: "bg-oldpurple",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Dex: {
    label: "Dexterity",
    color: "bg-cyan-700",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Chr: {
    label: "Charisma",
    color: "bg-lightorange",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Int: {
    label: "Intelligence",
    color: "bg-orange-500",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  HP: {
    label: "Health",
    color: "bg-red-500",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
};

export const clientOrderedStatTypes = [
  "Str",
  "Dex",
  "Chr",
  "Int",
] as const satisfies StatTypeEnum[];
