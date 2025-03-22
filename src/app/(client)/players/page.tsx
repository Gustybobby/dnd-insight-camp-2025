"use client";

import { getAllCharacters } from "@/server/controllers/character.controller";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { CharacterCarousel } from "@/components/players/CharacterCarousel";
import { StyledLink } from "@/components/ui/link";
import Image from "next/image";
import Link from "next/link";

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
    <div className="relative size-full min-h-screen overflow-hidden">
      <Image
        src="/asset/cover/player_select_bg.jpg"
        alt="cover"
        fill
        priority
        unoptimized
        className="scale-115 object-cover contrast-[110%]"
      />
      <Image
        src="/asset/props/logo_wing.png"
        alt="wing"
        priority
        unoptimized
        width={500}
        height={500}
        className="absolute left-0 right-0 top-[5%] mx-auto w-3/5 max-w-[50vh]"
      />
      <Link href="/">
        <Image
          src="/asset/props/back_arrow.png"
          alt="back arrow"
          priority
          unoptimized
          width={500}
          height={500}
          className="absolute left-4 top-4 size-12 transition-all hover:scale-105"
        />
      </Link>
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
    </div>
  );
}
