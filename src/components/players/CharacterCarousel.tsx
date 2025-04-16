import type { PlayerWithCharater } from "@/server/domain/aggregates";
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
          className="motion-preset-fade h-20 w-fit opacity-60 hover:scale-110"
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
          "h-full max-w-fit motion-duration-300",
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
          className="motion-preset-fade h-20 w-fit rotate-180 opacity-60 hover:scale-110"
        />
      </button>
    </div>
  );
}

export function CarouselPreview({
  className,
  currentIdx,
  players,
  slideFromRight,
}: {
  className?: string;
  currentIdx: number;
  players: PlayerWithCharater[];
  slideFromRight: boolean;
}) {
  const leftCharacter = players.at(currentIdx - 1)?.character;
  const character = players[currentIdx].character;
  const rightCharacter = players.at(
    (currentIdx + 1) % players.length,
  )?.character;
  return (
    <div className={className}>
      <div className="flex h-[12vh] items-center justify-center gap-8">
        {leftCharacter && (
          <Image
            key={leftCharacter.id + "_left"}
            src={leftCharacter.image}
            alt={leftCharacter.name}
            unoptimized
            width={500}
            height={500}
            className={cn(
              "h-full opacity-30 motion-duration-300",
              slideFromRight
                ? "motion-preset-slide-right-lg"
                : "motion-preset-slide-left-lg",
            )}
          />
        )}
        <Image
          key={character.id}
          src={character.image}
          alt={character.name}
          unoptimized
          width={500}
          height={500}
          className={cn(
            "h-full motion-duration-300",
            slideFromRight
              ? "motion-preset-slide-right-lg"
              : "motion-preset-slide-left-lg",
          )}
        />
        {rightCharacter && (
          <Image
            key={rightCharacter.id + "_right"}
            src={rightCharacter.image}
            alt={rightCharacter.name}
            unoptimized
            width={500}
            height={500}
            className={cn(
              "h-full opacity-30 motion-duration-300",
              slideFromRight
                ? "motion-preset-slide-right-lg"
                : "motion-preset-slide-left-lg",
            )}
          />
        )}
      </div>
    </div>
  );
}
