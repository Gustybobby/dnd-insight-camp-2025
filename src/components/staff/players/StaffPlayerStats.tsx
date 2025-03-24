import type { PlayerStat } from "@/server/domain/models";

import { StatChanger } from "./components";
import { STAT_TEXT_STYLE_MAP } from "./style";
import { STAT_STYLE_MAP } from "@/components/players/style";

export function StaffPlayerStats({
  playerStats,
  onSubmit,
  isChanging,
}: {
  playerStats: PlayerStat[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isChanging: boolean;
}) {
  return (
    <div className="p-2">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
          className={`mt-4 self-center rounded-md border-2 border-gray-100 bg-white p-2 text-black ${isChanging ? "cursor-not-allowed bg-slate-300" : "cursor-pointer"}`}
          type="submit"
          disabled
        >
          {isChanging ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
