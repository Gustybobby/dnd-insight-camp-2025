import type { PlayerItemWithInfo } from "@/server/domain/aggregates/player-item.aggregate";
import type { StatTypeEnum } from "@/server/domain/models/player-stat.model";

import React from "react";

import { InfoBadge } from "@/components/players/details/inventory";
import { STAT_STYLE_MAP } from "@/components/players/style";
import { cn } from "@/components/utils";
import Image from "next/image";

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
  const [statChangeValue, setStatChangeValue] = React.useState(0);
  return (
    <div className="flex flex-col gap-2">
      <p className={cn("font-bold", textColorClassName)}>{label}</p>
      <div className="grid grid-cols-6 gap-1">
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
        <div className={cn(`flex w-full flex-col items-center justify-center rounded-3xl bg-black border-black border-2`,colorClassName)}>
          <p className={cn("text-2xl font-bold black")}>
            {value}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <p className={cn("text-4xl font-bold", textColorClassName)}>+</p>
        </div>
        <input
          className={cn(
            "border-1 bg-lightcream w-full border-2 border-oldcream text-center text-2xl rounded-3xl",
            textColorClassName,
          )}
          name={type}
          type="number"
          value={statChangeValue}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if(isNaN(value)){
              setStatChangeValue(0);
              return;
            }
            if(statChangeValue===0){
              setStatChangeValue(value);
              return;
            }
            setStatChangeValue(value);
          }}
          required
        />
        <div className="flex w-full flex-col items-center justify-center">
          <p className={cn("text-4xl font-bold", textColorClassName)}>=</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <p className={cn("text-4xl font-bold", textColorClassName)}>
            {value + statChangeValue}
          </p>
        </div>
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
                  STAT_STYLE_MAP[statType as StatTypeEnum].bgColor +
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

// export function SkillCard({
//   skill,
//   onClick,
// }: {
//   skill: PlayerItemWithInfo["item"];
//   onClick: (item: PlayerItemWithInfo["item"]) => void;
// }) {
//   return (
//     <div
//       className="flex flex-row items-center gap-4 rounded-md border-2 border-black bg-white p-2 shadow"
//       onClick={() => onClick(item)}
//     >
//       <div className="flex h-8 w-8 items-center justify-center">
//         <Image
//           src={item.image}
//           width={50}
//           height={50}
//           className="h-auto w-auto"
//           alt={item.name}
//         />
//       </div>
//       <div className="flex flex-col">
//         <h1>{item.name}</h1>
//         <div className="flex items-center gap-2">
//           {item.stats
//             .map((statText) => statText.split(":"))
//             .map(([statType, value], idx) => (
//               <InfoBadge
//                 key={idx}
//                 className={
//                   STAT_STYLE_MAP[statType as StatTypeEnum].bgColor +
//                   " text-xs font-semibold"
//                 }
//               >
//                 {statType} {value}
//               </InfoBadge>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }