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
    color: "bg-radial-gradient from-strcolor-in to-strcolor-out",
    textColor: "text-strcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Dex: {
    label: "Dexterity",
    color: "bg-radial-gradient from-dexcolor-in to-dexcolor-out",
    textColor: "text-dexcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Chr: {
    label: "Charisma",
    color: "bg-radial-gradient from-chrcolor-in to-chrcolor-out",
    textColor: "text-chrcolor",
    description:
      "Integer consequat dolor nec tellus ullamcorper, ac iaculis elit mattis. Pellentesque et sem sit amet leo placerat imperdiet. Curabitur enim lacus, abradacradaba hello what are you this is dextroryrasdaslkdaljwqeicjqwiceqwceqcw",
  },
  Int: {
    label: "Intelligence",
    color: "bg-radial-gradient from-intcolor-in to-intcolor-out",
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
