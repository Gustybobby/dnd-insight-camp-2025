import type { PlayerStat } from "@/server/domain/models";

import { STAT_TEXT_STYLE_MAP } from "../style";
import StyledButton from "../StyledButton";
import { StatChanger } from "./components";
import { STAT_STYLE_MAP } from "@/components/players/style";

export function StaffPlayerStats({
  playerStats,
  onSubmit,
}: {
  playerStats: PlayerStat[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="p-2">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {playerStats.map((stat) => (
          <StatChanger
            key={stat.type}
            label={STAT_STYLE_MAP[stat.type].label}
            iconSrc={
              stat.type.toLowerCase() != "hp"
                ? `/asset/props/${stat.type.toLowerCase()}.png`
                : `/asset/props/heart.png`
            }
            value={stat.value}
            colorClassName={STAT_STYLE_MAP[stat.type].iconColor}
            textColorClassName={STAT_TEXT_STYLE_MAP[stat.type].color}
            type={stat.type}
          />
        ))}
        <StyledButton type="submit">{"Submit"}</StyledButton>
      </form>
    </div>
  );
}
