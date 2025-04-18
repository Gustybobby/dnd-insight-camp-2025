import { cn } from "@/components/utils";
import React from "react";
import Image from "next/image";
import { BossStatsStateType, DamageCalculator } from "./StaffBattleSession";
import { statLowerCaseType } from "./type";
import { STAT_STYLE_MAP } from "@/components/players/style";
import { STAT_TEXT_STYLE_MAP } from "../style";
import { STATS_ARRAY_LOWERCASE } from "../constants";

export default function StaffBattleSessionBossStatInput({
  label,
  iconSrc,
  colorClassName,
  textColorClassName,
  type,
  bossStats,
  setBossStats,
}: {
  label: string;
  iconSrc: string;
  colorClassName: string;
  textColorClassName: string;
  type: statLowerCaseType;
  bossStats: BossStatsStateType;
  setBossStats: React.Dispatch<React.SetStateAction<BossStatsStateType>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className={cn("font-bold", textColorClassName)}>{label}</p>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center justify-center">
          <div
            className={cn(
              "motion-preset-shake flex size-12 items-center justify-center rounded-full border-2 border-black bg-gray-400 motion-duration-500",
              colorClassName,
            )}
          >
            <Image
              src={iconSrc}
              alt={label}
              className="h-7 w-auto"
              width={128}
              height={128}
            />
          </div>
        </div>

        <input
          id={`${type}_input`}
          className={cn(
            "border-1 w-full rounded-3xl border-2 border-oldcream bg-lightcream text-center text-2xl",
            textColorClassName,
          )}
          name={type}
          value={bossStats[type]}
          onChange={(e) => {
            setBossStats({
              ...bossStats,
              [type]: e.target.value,
            });
          }}
          required
        />
      </div>
    </div>
  );
}

export function StaffBattleSessionBossDamageCalculator({
  name,
  label,
  iconSrc,
  colorClassName,
  textColorClassName,
  type,
  damageCalculator,
  setDamageCalculator,
  bossStats,
}: {
  name?: string;
  label: string;
  iconSrc: string;
  colorClassName: string;
  textColorClassName: string;
  type: statLowerCaseType;
  damageCalculator: DamageCalculator;
  setDamageCalculator: React.Dispatch<React.SetStateAction<DamageCalculator>>;
  bossStats: BossStatsStateType;
}) {
  const calculateDamage = (
    roll: string,
    multiply: string,
    statValue?: number,
  ) => {
    const numRoll = parseInt(roll);
    const numMultiply = parseFloat(multiply);
    if (!statValue) return numRoll * numMultiply;

    return numRoll * numMultiply + statValue;
  };
  return (
    <div className="flex flex-col gap-2">
      <p className={cn("font-bold", textColorClassName)}>{label}</p>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-5 text-2xl">
          <div className="flex flex-col text-center">
            <label className="">Roll</label>
            <input
              id={`${name}_roll_input`}
              className={cn(
                "border-1 w-full rounded-3xl border-2 border-oldcream bg-lightcream text-center text-2xl",
                textColorClassName,
              )}
              name={`${name}_roll_input`}
              value={damageCalculator.roll}
              onChange={(e) => {
                setDamageCalculator({
                  ...damageCalculator,
                  roll: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="">Multiply</label>
            <input
              id={`${name}_multiply_input`}
              className={cn(
                "border-1 w-full rounded-3xl border-2 border-oldcream bg-lightcream text-center text-2xl",
                textColorClassName,
              )}
              name={`${name}_multiply_input`}
              value={damageCalculator.multiply}
              onChange={(e) => {
                setDamageCalculator({
                  ...damageCalculator,
                  multiply: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="">Stat</label>
            <select
              id={`${name}_damage_type_input`}
              className={cn(
                "border-1 w-full rounded-3xl border-2 border-oldcream bg-lightcream text-center text-2xl",
                textColorClassName,
              )}
              name={`${name}_damage_type_input`}
              value={damageCalculator.stat ?? ""}
              onChange={(e) => {
                setDamageCalculator({
                  ...damageCalculator,
                  stat: e.target.value as statLowerCaseType,
                });
              }}
              required
            >
              {STATS_ARRAY_LOWERCASE.map((stat) => (
                <option value={stat}>{stat}</option>
              ))}
            </select>
          </div>
          <p className="flex items-center justify-center">=</p>
          <p className="flex items-center justify-center">
            {damageCalculator.stat
              ? calculateDamage(
                  damageCalculator.roll,
                  damageCalculator.multiply,
                )
              : calculateDamage(
                  damageCalculator.roll,
                  damageCalculator.multiply,
                  bossStats[damageCalculator.stat],
                )}
          </p>
        </div>
      </div>

      {/* <input
          id={`${type}_input`}
          className={cn(
            "border-1 w-full rounded-3xl border-2 border-oldcream bg-lightcream text-center text-2xl",
            textColorClassName,
          )}
          name={type}
          value={bossStats[type]}
          onChange={(e) => {
            setBossStats({
              ...bossStats,
              [type]: e.target.value,
            });
          }}
          required
        /> */}
    </div>
  );
}
