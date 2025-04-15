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
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Dex: {
    label: "Dexterity",
    iconColor: "bg-radial-gradient from-dexcolor-in to-dexcolor-out",
    bgColor: "bg-dexcolor",
    textColor: "text-dexcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Chr: {
    label: "Charisma",
    iconColor: "bg-radial-gradient from-chrcolor-in to-chrcolor-out",
    bgColor: "bg-chrcolor",
    textColor: "text-chrcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Int: {
    label: "Intelligence",
    iconColor: "bg-radial-gradient from-intcolor-in to-intcolor-out",
    bgColor: "bg-intcolor",
    textColor: "text-intcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  HP: {
    label: "Health",
    iconColor: "bg-red-500",
    bgColor: "bg-red-500",
    textColor: "text-red-500",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
};
