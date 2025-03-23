import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type {
  Character,
  EquipmentPartEnum,
  StatTypeEnum,
} from "@/server/domain/models";

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
      className={cn("rounded-lg border-4 border-black bg-cream", className)}
    >
      {children}
    </section>
  );
}

export function TitleBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="motion-preset-pop relative flex h-20 items-center justify-center motion-duration-200">
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
    <div className="motion-preset-bounce relative mb-4 max-w-32 motion-delay-200">
      <h1 className="text-center font-[family-name:var(--noto-sans-thai)] font-bold">
        {character.name}
      </h1>
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
        className="motion-preset-shake w-12 motion-duration-500"
      />
      <div className="relative h-8 w-full rounded-full border-2 border-black bg-zinc-300">
        <div
          className="absolute h-[calc(2rem-4px)] origin-left rounded-full bg-red-500 transition-all motion-scale-x-in-0"
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
        "motion-preset-pop flex size-12 items-center justify-center rounded-lg border-2 border-black bg-gray-400 shadow-md shadow-lightorange motion-duration-200",
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
  colorClassName,
  onClickIcon,
}: {
  label: string;
  type: StatTypeEnum;
  iconSrc: string;
  value: number;
  max: number;
  colorClassName: string;
  onClickIcon?: (type: StatTypeEnum) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-center">
        <StatIcon
          className={cn(colorClassName, "hover:cursor-pointer")}
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
              colorClassName,
            )}
            style={{ width: `${Math.ceil((value / max) * 100)}%` }}
          />
        </div>
      </div>
    </>
  );
}
