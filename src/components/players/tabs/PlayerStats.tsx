import type { PlayerStat } from "@/server/domain/models";

import { StatBar, StatsGrid } from "@/components/players/components";
import { STAT_STYLE_MAP } from "@/components/players/style";

export function PlayerStats({ playerStats }: { playerStats: PlayerStat[] }) {
  return (
    <StatsGrid>
      {playerStats.map((stat) => (
        <StatBar
          key={stat.type}
          label={STAT_STYLE_MAP[stat.type].label}
          iconSrc={`/asset/props/${stat.type.toLowerCase()}.png`}
          value={stat.value}
          max={100}
          colorClassName={STAT_STYLE_MAP[stat.type].color}
        />
      ))}
    </StatsGrid>
  );
}
