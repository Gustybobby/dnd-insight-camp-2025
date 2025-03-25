import { PlayerStat } from "@/server/domain/models";
import React from "react";
import { ALL_STAT_TYPES } from "@/shared/stat";

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
