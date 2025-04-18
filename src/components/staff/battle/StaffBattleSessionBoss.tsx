import type {
  BossStatsStateType,
  DamageCalculator,
} from "./StaffBattleSession";
import type { statLowerCaseType } from "./type";

import { ALL_STAT_TYPES } from "@/shared/stat";

import { STAT_TEXT_STYLE_MAP } from "../style";
import StaffBattleSessionBossStatInput, {
  StaffBattleSessionBossDamageCalculator,
} from "./components";
import { STAT_STYLE_MAP } from "@/components/players/style";

export default function StaffBattleSessionBoss({
  bossStats,
  setBossStats,
  bossDamageToPlayerCalculator,
  setBossDamageToPlayerCalculator,
  // playerDamageToBossCalculator,
  // setPlayerDamageToBossCalculator,
}: {
  bossStats: BossStatsStateType;
  setBossStats: React.Dispatch<React.SetStateAction<BossStatsStateType>>;
  bossDamageToPlayerCalculator: DamageCalculator;
  setBossDamageToPlayerCalculator: React.Dispatch<
    React.SetStateAction<DamageCalculator>
  >;
  // playerDamageToBossCalculator?: DamageCalculator;
  // setPlayerDamageToBossCalculator?: React.Dispatch<
  //   React.SetStateAction<DamageCalculator>
  // >;
}) {
  return (
    <div className="w-full p-2">
      <div className="">
        <div className="grid grid-cols-2">
          {ALL_STAT_TYPES.map((stat) => (
            <StaffBattleSessionBossStatInput
              key={`staff-battle-session-boss-stat-${stat}-input`}
              label={STAT_STYLE_MAP[stat].label}
              iconSrc={
                stat.toLowerCase() != "hp"
                  ? `/asset/props/${stat.toLowerCase()}.png`
                  : `/asset/props/heart.png`
              }
              colorClassName={STAT_STYLE_MAP[stat].iconColor}
              textColorClassName={STAT_TEXT_STYLE_MAP[stat].color}
              bossStats={bossStats}
              setBossStats={setBossStats}
              type={stat.toLowerCase() as statLowerCaseType}
            />
          ))}
        </div>
        <div className="col-span-2">
          <h1>Damage Give</h1>
          <StaffBattleSessionBossDamageCalculator
            label={""}
            textColorClassName={""}
            bossStats={bossStats}
            damageCalculator={bossDamageToPlayerCalculator}
            setDamageCalculator={setBossDamageToPlayerCalculator}
          />
        </div>
      </div>
    </div>
  );
}
