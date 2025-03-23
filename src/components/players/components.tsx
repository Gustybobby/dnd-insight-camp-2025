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
