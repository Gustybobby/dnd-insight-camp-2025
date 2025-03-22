import type { Character } from "@/server/domain/models";

import { cn } from "@/components/utils";
import Image from "next/image";

export function CharacterCarousel({
  className,
  character,
  slideFromRight,
  onClickLeft,
  onClickRight,
}: {
  className?: string;
  character: Character;
  slideFromRight: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
}) {
  return (
    <div className={className}>
      <button onClick={onClickLeft} className="h-fit">
        <Image
          src={"/asset/props/polygon.png"}
          alt="button left"
          width={500}
          height={500}
          unoptimized
          className="motion-preset-fade h-20 w-fit hover:scale-110"
        />
      </button>
      <Image
        key={character.id}
        src={character.image}
        alt={character.name}
        priority
        unoptimized
        width={500}
        height={500}
        className={cn(
          "motion-duration-300 aspect-square h-full max-w-fit",
          slideFromRight
            ? "motion-preset-slide-right-md"
            : "motion-preset-slide-left-md",
        )}
        quality={100}
      />
      <button onClick={onClickRight} className="h-fit">
        <Image
          src={"/asset/props/polygon.png"}
          alt="button right"
          width={500}
          height={500}
          unoptimized
          className="motion-preset-fade h-20 w-fit rotate-180 hover:scale-110"
        />
      </button>
    </div>
  );
}
