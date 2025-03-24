import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";

import { ORDERED_EQUIPMENTS } from "@/shared/item";

import { cn } from "@/components/utils";
import Image from "next/image";

export function Slot({
  className,
  placeholderSrc,
  onClick,
}: {
  className?: string;
  placeholderSrc: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "motion-preset-pop flex size-12 items-center justify-center rounded-lg border-2 border-black bg-gray-400 shadow-md shadow-lightorange motion-duration-200",
        className,
      )}
      onClick={onClick}
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

export function EquipmentsBar({
  equipments,
  onClickEquipment,
}: {
  equipments: PlayerEquipmentWithInfo[];
  onClickEquipment?: (itemId: PlayerEquipmentWithInfo["itemId"]) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
      <h1 className="motion-preset-pop font-bold motion-duration-200">
        Equipments
      </h1>
      {ORDERED_EQUIPMENTS.map((part) => {
        const item = equipments.find(
          (equipment) => equipment.part === part,
        )?.item;
        return (
          <Slot
            key={part + item?.id}
            className={cn(item && "hover:cursor-pointer")}
            placeholderSrc={
              item?.image ?? `/asset/props/${part.toLowerCase()}.png`
            }
            onClick={() => {
              if (item) {
                onClickEquipment?.(item.id);
              }
            }}
          />
        );
      })}
    </div>
  );
}
