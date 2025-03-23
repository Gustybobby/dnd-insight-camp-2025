"use client";

import { getAllPlayers } from "@/server/controllers/player.controller";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { CharacterCarousel } from "@/components/players/CharacterCarousel";
import { TitleBanner } from "@/components/players/components";
import { StyledLink } from "@/components/ui/link";

export default function PlayersPage() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const prevIdxRef = useRef(0);

  const { data: players } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayers(),
  });

  function slideInFromRight(): boolean {
    if (!players) {
      return false;
    }
    if (currentIdx === 0 && prevIdxRef.current === players.length - 1) {
      return false;
    }
    if (currentIdx === players.length - 1 && prevIdxRef.current === 0) {
      return true;
    }
    return prevIdxRef.current > currentIdx;
  }

  const character = players?.[currentIdx].character;

  if (!character) {
    return null;
  }

  return (
    <>
      <div className="absolute left-0 right-0 top-[20%] mx-auto flex w-full flex-col items-center justify-center">
        <div className="w-80">
          <TitleBanner>Group {players?.[currentIdx].id}</TitleBanner>
        </div>
        <div className="motion-preset-fade w-48 px-4 py-2 text-center text-2xl font-semibold text-lightorange drop-shadow-lg">
          <p className="font-[family-name:var(--noto-sans-thai)]">
            {character.name}
          </p>
        </div>
      </div>

      <CharacterCarousel
        className="absolute bottom-0 left-0 right-0 top-[10%] m-auto flex h-[35%] w-11/12 items-center justify-between gap-2"
        character={character}
        slideFromRight={slideInFromRight()}
        onClickLeft={() => {
          prevIdxRef.current = currentIdx;
          setCurrentIdx((idx) => (idx === 0 ? players.length - 1 : idx - 1));
        }}
        onClickRight={() => {
          prevIdxRef.current = currentIdx;
          setCurrentIdx((idx) => (idx === players.length - 1 ? 0 : idx + 1));
        }}
      />

      <StyledLink
        href={`/players/${players?.[currentIdx].id}`}
        className="motion-preset-bounce absolute bottom-[10%] px-8 py-4 text-3xl motion-delay-300"
        spanClassName="bg-cream border-cream"
      >
        Character Insight
      </StyledLink>
    </>
  );
}
