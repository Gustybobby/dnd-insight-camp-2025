import type { PlayerStat } from "@/server/domain/models";

import { StatBar, StatsGrid } from "@/components/players/components";
import { STAT_STYLE_MAP } from "@/components/players/style";
import { StatChanger } from "./components";
import { STAT_TEXT_STYLE_MAP } from "./style";
import { UseFormRegister } from "react-hook-form";

export default function StaffPlayerStats({
  playerStats,
  register,
}: {
  playerStats: PlayerStat[];
  register: UseFormRegister<StatChangeFormData>;
}) {
  return (
    <div className="flex flex-col gap-2 p-2">
      {playerStats.map((stat) => (
        <StatChanger
          key={stat.type}
          label={STAT_STYLE_MAP[stat.type].label}
          iconSrc={`/asset/props/${stat.type.toLowerCase()}.png`}
          value={stat.value}
          max={100}
          colorClassName={STAT_STYLE_MAP[stat.type].color}
          textColorClassName={STAT_TEXT_STYLE_MAP[stat.type].color}
          register={register}
        />
      ))}
    </div>
  );
}
