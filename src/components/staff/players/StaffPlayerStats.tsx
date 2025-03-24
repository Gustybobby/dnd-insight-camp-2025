import type { PlayerStat } from "@/server/domain/models";

import { StatChanger } from "./components";
import { STAT_TEXT_STYLE_MAP } from "./style";
import { STAT_STYLE_MAP } from "@/components/players/style";

export function StaffPlayerStats({
  playerStats,
  onSubmit,
}: {
  playerStats: PlayerStat[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <form onSubmit={onSubmit}>
        {playerStats.map((stat) => (
          <StatChanger
            key={stat.type}
            label={STAT_STYLE_MAP[stat.type].label}
            iconSrc={`/asset/props/${stat.type.toLowerCase()}.png`}
            value={stat.value}
            colorClassName={STAT_STYLE_MAP[stat.type].color}
            textColorClassName={STAT_TEXT_STYLE_MAP[stat.type].color}
            type={stat.type}
          />
        ))}
        <button
          className="mt-4 self-center rounded-md border-2 border-gray-100 bg-white p-2 text-black"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
