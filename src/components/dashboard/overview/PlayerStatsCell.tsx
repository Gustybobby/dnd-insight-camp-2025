import type { PlayerStat } from "@/server/domain/models";

import { ALL_STAT_TYPES } from "@/shared/stat";

import React from "react";

interface PlayerStatsCellProp {
  stats: PlayerStat[];
}

export default function PlayerStatsCell({ stats }: PlayerStatsCellProp) {
  const statsValue = ALL_STAT_TYPES.map(
    (type) => stats.find((element) => element.type === type)?.value,
  );
  return (
    <td>
      <div className="flex">
        {statsValue.map((value, index) => (
          <div className="flex-1 text-center" key={index}>
            {value}
          </div>
        ))}
      </div>
    </td>
  );
}
