import type { PlayerStat, StatTypeEnum } from "@/server/domain/models";

import { StatBar, StatIcon, StatsGrid } from "@/components/players/components";
import { STAT_STYLE_MAP } from "@/components/players/style";

export function PlayerStats({
  playerStats,
  onClickIcon,
}: {
  playerStats: PlayerStat[];
  onClickIcon?: (type: StatTypeEnum) => void;
}) {
  return (
    <StatsGrid>
      {playerStats.map((stat) => (
        <StatBar
          key={stat.type}
          type={stat.type}
          label={STAT_STYLE_MAP[stat.type].label}
          iconSrc={`/asset/props/${stat.type.toLowerCase()}.png`}
          value={stat.value}
          max={100}
          colorClassName={STAT_STYLE_MAP[stat.type].color}
          onClickIcon={onClickIcon}
        />
      ))}
    </StatsGrid>
  );
}

export function StatInfo({
  type,
  onClickBack,
}: {
  type: StatTypeEnum;
  onClickBack: () => void;
}) {
  const statStyle = STAT_STYLE_MAP[type];
  return (
    <div className="w-full p-2">
      <button className="mb-4 font-bold" onClick={onClickBack}>
        {"←"} Back
      </button>
      <div className="grid grid-cols-4 gap-4">
        <StatIcon
          className={statStyle.color}
          src={`/asset/props/${type.toLowerCase()}.png`}
          type={type}
        />
        <h1 className="col-span-3 rounded-full bg-oldcream px-8 py-2 text-center text-xl font-bold">
          {statStyle.label}
        </h1>
        <p className="col-span-full text-left">{statStyle.description}</p>
      </div>
    </div>
  );
}
