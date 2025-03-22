"use client";

import { getAllCharacters } from "@/server/controllers/character.controller";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { CharacterCarousel } from "@/components/players/CharacterCarousel";
import { StyledLink } from "@/components/ui/link";

export default function PlayersPage() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const prevIdxRef = useRef(0);

  const { data: characters } = useQuery({
    queryKey: ["getAllCharacters"],
    queryFn: async () => await getAllCharacters(),
  });

  function slideInFromRight(): boolean {
    if (!characters) {
      return false;
    }
    if (currentIdx === 0 && prevIdxRef.current === characters.length - 1) {
      return false;
    }
    if (currentIdx === characters.length - 1 && prevIdxRef.current === 0) {
      return true;
    }
    return prevIdxRef.current > currentIdx;
  }

  const character = characters?.[currentIdx];

  return (
    <>
      {character ? (
        <CharacterCarousel
          className="absolute bottom-[10%] left-0 right-0 top-0 m-auto flex h-[35%] w-11/12 items-center justify-between gap-2"
          character={character}
          slideFromRight={slideInFromRight()}
          onClickLeft={() => {
            prevIdxRef.current = currentIdx;
            setCurrentIdx((idx) =>
              idx === 0 ? characters.length - 1 : idx - 1,
            );
          }}
          onClickRight={() => {
            prevIdxRef.current = currentIdx;
            setCurrentIdx((idx) =>
              idx === characters.length - 1 ? 0 : idx + 1,
            );
          }}
        />
      ) : null}
      {character ? (
        <div className="absolute bottom-[30%] left-0 right-0 mx-auto flex w-full justify-center">
          <div className="motion-preset-fade w-48 bg-zinc-300 px-4 py-2 text-center text-2xl font-semibold">
            {character.name}
          </div>
        </div>
      ) : null}
      {character ? (
        <StyledLink
          href={`/players/id`}
          className="motion-preset-bounce motion-delay-300 absolute bottom-[10%] px-8 py-4 text-3xl"
          spanClassName="bg-lightorange border-lightorange"
        >
          Character Insight
        </StyledLink>
      ) : null}
    </>
  );
}
