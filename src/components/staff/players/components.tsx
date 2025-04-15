import { cn } from "@/components/utils";
import { PlayerItemWithInfo } from "@/server/domain/aggregates/player-item.aggregate";
import Image from "next/image";
import { InfoBadge } from "@/components/players/details/inventory";
import { STAT_STYLE_MAP } from "@/components/players/style";
import { StatTypeEnum } from "@/server/domain/models/player-stat.model";

export function StatChanger({
  label,
  iconSrc,
  value,
  colorClassName,
  textColorClassName,
  type,
}: {
  label: string;
  iconSrc: string;
  value: number;
  colorClassName: string;
  textColorClassName: string;
  type: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className={cn("font-bold", textColorClassName)}>{label}</p>
      <div className="grid grid-cols-4 gap-4">
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
              className="size-8"
              width={128}
              height={128}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <p className={cn("text-5xl font-bold", textColorClassName)}>
            {value}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <p className={cn("text-5xl font-bold", textColorClassName)}>+</p>
        </div>
        <input
          className={cn(
            "border-1 w-full rounded-md border-2 border-darkred text-center text-2xl",
            textColorClassName,
          )}
          name={type}
          defaultValue={0}
          required
        />
      </div>
    </div>
  );
}

export function ItemCard({
  item,
  onClick,
}: {
  item: PlayerItemWithInfo["item"];
  onClick: (item: PlayerItemWithInfo["item"]) => void;
}) {
  return (
    <div
      className="flex flex-row items-center gap-4 rounded-md border-2 border-black bg-white p-2 shadow"
      onClick={() => onClick(item)}
    >
      <div className="flex h-8 w-8 items-center justify-center">
        <Image
          src={item.image}
          width={50}
          height={50}
          className="h-auto w-auto"
          alt={item.name}
        />
      </div>
      <div className="flex flex-col">
        <h1>{item.name}</h1>
        <div className="flex items-center gap-2">
          {item.stats
            .map((statText) => statText.split(":"))
            .map(([statType, value], idx) => (
              <InfoBadge
                key={idx}
                className={
                  STAT_STYLE_MAP[statType as StatTypeEnum].color +
                  " text-xs font-semibold"
                }
              >
                {statType} {value}
              </InfoBadge>
            ))}
        </div>
      </div>
    </div>
  );
}
