import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type { Character, EquipmentPartEnum } from "@/server/domain/models";

import { cn } from "@/components/utils";
import Image from "next/image";
import { UseFormRegister } from "react-hook-form";

export function StatChanger({
  label,
  iconSrc,
  value,
  max,
  colorClassName,
  textColorClassName,
  register
}: {
  label: string;
  iconSrc: string;
  value: number;
  max: number;
  colorClassName: string;
  textColorClassName: string;
  register: UseFormRegister<StatChangeFormData>;
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
          className="border-1 w-full border border-gray-100"
          required
          {...register("name")}
        />
      </div>
    </div>
  );
}
