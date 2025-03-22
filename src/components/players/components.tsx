import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type { Character, EquipmentPartEnum } from "@/server/domain/models";

import { cn } from "@/components/utils";
import Image from "next/image";

export function CharacterBox({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("bg-cream rounded-lg border-4 border-black", className)}
    >
      {children}
    </section>
  );
}

export function TitleBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="motion-preset-pop motion-duration-200 relative flex h-20 items-center justify-center">
      <Image
        src={"/asset/props/title_banner.png"}
        alt="banner image"
        className="absolute w-80"
        width={200}
        height={200}
      />
      <p className="z-10 mb-8 text-2xl">{children}</p>
    </div>
  );
}

export function CharacterModel({ character }: { character: Character }) {
  return (
    <div className="motion-preset-bounce motion-delay-200 relative mb-4 max-w-32">
      <h1 className="text-center font-bold">{character.name}</h1>
      <Image
        key={character.id}
        src={character.image}
        alt={character.name}
        priority
        unoptimized
        width={500}
        height={500}
        className="relative z-10 h-full w-fit"
        quality={100}
      />
      <div className="absolute -bottom-2 left-0 right-0 mx-auto h-14 w-32 rounded-[50%] bg-black opacity-20" />
    </div>
  );
}

export function HealthBar({ health, max }: { health: number; max: number }) {
  return (
    <div className="flex items-center gap-2 p-4">
      <Image
        src={"/asset/props/heart.png"}
        alt="heart"
        width={256}
        height={256}
        className="motion-preset-shake motion-duration-500 w-12"
      />
      <div className="relative h-8 w-full rounded-full border-2 border-black bg-zinc-300">
        <div
          className="motion-scale-x-in-0 absolute h-[calc(2rem-4px)] origin-left rounded-full bg-red-500"
          style={{ width: `${Math.ceil((health / max) * 100)}%` }}
        />
        <p className="relative z-10 flex h-8 w-full items-center justify-center font-bold">
          {health} / {max}
        </p>
      </div>
    </div>
  );
}

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
        "shadow-lightorange motion-preset-pop motion-duration-200 flex size-12 items-center justify-center rounded-lg border-2 border-black bg-gray-400 shadow-md",
        className,
      )}
    >
      <Image
        src={placeholderSrc}
        alt="sword placeholder"
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

export function StatsGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full grid-cols-4 gap-4 p-4">{children}</div>;
}

export function StatBar({
  label,
  iconSrc,
  value,
  max,
  colorClassName,
}: {
  label: string;
  iconSrc: string;
  value: number;
  max: number;
  colorClassName: string;
}) {
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className={cn(
            "motion-preset-shake motion-duration-500 flex size-12 items-center justify-center rounded-full border-2 border-black bg-gray-400",
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
      <div className="col-span-3 flex flex-col justify-center">
        <div className="flex w-full justify-between text-lg">
          <p className="font-bold">{label}</p>
          <p className="font-bold">{value}</p>
        </div>
        <div className="relative h-4 w-full rounded-full border-2 border-black bg-zinc-300">
          <div
            className={cn(
              "motion-scale-x-in-0 absolute h-[calc(1rem-4px)] origin-left rounded-full",
              colorClassName,
            )}
            style={{ width: `${Math.ceil((value / max) * 100)}%` }}
          />
        </div>
      </div>
    </>
  );
}
