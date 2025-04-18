import type { PlayerStat, StatTypeEnum } from "@/server/domain/models";

import { STAT_TEXT_STYLE_MAP } from "../style";
import StyledButton from "../StyledButton";
import { StatChanger } from "./components";
import { STAT_STYLE_MAP } from "@/components/players/style";

export function StaffPlayerStats({
  playerStats,
  onSubmit,
}: {
  playerStats: PlayerStat[];
  onSubmit: (stats: { stat: StatTypeEnum; value: number }[]) => void;
}) {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-4">
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
        <StyledButton
          onClick={() => {
            try {
              onSubmit(
                playerStats
                  .map((stat) => {
                    const value = Number(
                      (
                        document.getElementById(
                          `${stat.type}_input`,
                        ) as HTMLInputElement
                      )?.value,
                    );
                    if (isNaN(value)) {
                      throw new Error(`invalid value for ${stat.type}`);
                    }
                    return {
                      stat: stat.type,
                      value,
                    };
                  })
                  .filter((stat) => stat.value > 0),
              );
            } catch (error) {
              if (error instanceof Error) {
                alert(error.message);
              }
            }
          }}
        >
          {"Submit"}
        </StyledButton>
      </div>
    </div>
  );
}
