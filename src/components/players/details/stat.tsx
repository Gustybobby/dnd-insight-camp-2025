import type { PlayerStat, StatTypeEnum } from "@/server/domain/models";

import { STAT_STYLE_MAP } from "@/components/players/style";
import { cn, constrain } from "@/components/utils";
import Image from "next/image";

export function HealthBar({ health, max }: { health: number; max: number }) {
  return (
    <div className="flex items-center gap-2 p-4">
      <Image
        src={"/asset/props/heart.png"}
        alt="heart"
        width={256}
        height={256}
        className="motion-preset-shake w-12 motion-duration-500"
      />
      <div className="relative h-8 w-full rounded-full border-2 border-black bg-zinc-300">
        <div
          className="absolute h-[calc(2rem-4px)] origin-left rounded-full bg-red-500 transition-all motion-scale-x-in-0"
          style={{
            width: `${constrain(Math.ceil((health / max) * 100), 0, 100)}%`,
          }}
        />
        <p className="relative z-10 flex h-8 w-full items-center justify-center font-bold">
          {health} / {max}
        </p>
      </div>
    </div>
  );
}

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
          className={statStyle.iconColor}
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

export function StatsGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full grid-cols-4 gap-4 p-4">{children}</div>;
}

export function StatIcon({
  className,
  src,
  type,
  onClick,
}: {
  className?: string;
  src: string;
  type: StatTypeEnum;
  onClick?: (type: StatTypeEnum) => void;
}) {
  return (
    <div
      className={cn(
        "motion-preset-shake flex size-12 items-center justify-center rounded-full border-2 border-black bg-gray-400 motion-duration-500",
        className,
      )}
      onClick={() => onClick?.(type)}
    >
      <Image src={src} alt={type} className="size-8" width={128} height={128} />
    </div>
  );
}

export function StatBar({
  label,
  type,
  iconSrc,
  value,
  max,
  onClickIcon,
}: {
  label: string;
  type: StatTypeEnum;
  iconSrc: string;
  value: number;
  max: number;
  onClickIcon?: (type: StatTypeEnum) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-center">
        <StatIcon
          className={cn(STAT_STYLE_MAP[type].iconColor, "hover:cursor-pointer")}
          src={iconSrc}
          type={type}
          onClick={onClickIcon}
        />
      </div>
      <div className="col-span-3 flex flex-col justify-center">
        <div className="flex w-full justify-between text-lg">
          <p className="font-bold">{label}</p>
          <p className="font-bold">{value}</p>
        </div>
        <div className="relative h-4 w-full rounded-full border-2 border-black bg-zinc-300">
          <div
            className={cn(
              "absolute h-[calc(1rem-4px)] origin-left rounded-full transition-all motion-scale-x-in-0",
              STAT_STYLE_MAP[type].bgColor,
            )}
            style={{
              width: `${constrain(Math.ceil((value / max) * 100), 0, 100)}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}
