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
            "border-1 w-full rounded rounded-md border border-2 border-darkred text-center text-2xl",
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
