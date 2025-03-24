import type { StatTypeEnum } from "@/server/domain/models";

interface StatStyle {
  label: string;
  color: string;
  textColor: string;
  description: string;
}

export const STAT_STYLE_MAP: Record<StatTypeEnum, StatStyle> = {
  Str: {
    label: "Strength",
    color: "bg-strcolor",
    textColor: "text-strcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Dex: {
    label: "Dexterity",
    color: "bg-dexcolor",
    textColor: "text-dexcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Chr: {
    label: "Charisma",
    color: "bg-lightorange",
    textColor: "text-lightorange",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Int: {
    label: "Intelligence",
    color: "bg-intcolor",
    textColor: "text-intcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  HP: {
    label: "Health",
    color: "bg-red-500",
    textColor: "text-red-500",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
};
