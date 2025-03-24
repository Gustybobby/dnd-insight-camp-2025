import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type { EquipmentPartEnum } from "@/server/domain/models";

import { cn } from "@/components/utils";
import Image from "next/image";

export function Slot({
  className,
  placeholderSrc,
}: {
  className?: string;
  placeholderSrc: string;
}) {
  return (
    <div
      className={cn(
        "motion-preset-pop flex size-12 items-center justify-center rounded-lg border-2 border-black bg-gray-400 shadow-md shadow-lightorange motion-duration-200",
        className,
      )}
    >
      <Image
        src={placeholderSrc}
        alt="placeholder"
        width={128}
        height={128}
        className="size-8"
      />
    </div>
  );
}

const equipmentsOrder: EquipmentPartEnum[] = ["Sword", "Armor", "Gear"];
const delays = [
  "motion-delay-200",
  "motion-delay-[400ms]",
  "motion-delay-[600ms]",
];

export function EquipmentsBar({
  equipments,
}: {
  equipments: PlayerEquipmentWithInfo[];
}) {
  console.log(equipments);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
      <h1 className="font-bold">Equipments</h1>
      {equipmentsOrder.map((part, idx) => (
        <Slot
          key={part}
          className={delays[idx]}
          placeholderSrc={`/asset/props/${part.toLowerCase()}.png`}
        />
      ))}
    </div>
  );
}
