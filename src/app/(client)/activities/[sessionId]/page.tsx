"use client";

import { TitleBanner } from "@/components/players/components";
import { StyledLink } from "@/components/ui/link";
import { cn } from "@/components/utils";
import { getPlayerCharacter } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function ActivitySessionPage() {
  const { data: character } = useQuery({
    queryKey: ["getPlayerCharacter", 1],
    queryFn: async () => await getPlayerCharacter({ playerId: 1 }),
  });

  return (
    <>
      <div className="absolute left-0 right-0 top-[15%] mx-auto flex w-full flex-col items-center justify-center">
        <div className="w-80">
          <TitleBanner>Player 1 Turn</TitleBanner>
        </div>
      </div>
      {character && (
        <div className="motion-preset-bounce absolute -top-[10%] bottom-0 left-0 right-0 m-auto flex h-[30%] w-11/12 items-center justify-center gap-2">
          <Image
            key={character.id}
            src={character.image}
            alt={character.name}
            priority
            unoptimized
            width={500}
            height={500}
            className={cn("h-full max-w-fit motion-duration-300")}
            quality={100}
          />
        </div>
      )}
      <div className="absolute bottom-[20%] left-0 right-0 mx-auto w-11/12">
        <ul className="h-[20vh] overflow-auto border-4 border-gray-500 bg-gray-800 bg-opacity-90 p-2 leading-tight text-white">
          <li>Player 1 used Lightning Bolt..</li>
          <li>Player 2 used Shields..</li>
          <li>Boss Attacks Player 2...</li>{" "}
          <li>Player 1 used Lightning Bolt..</li>
          <li>Player 2 used Shields..</li>
          <li>Boss Attacks Player 2...</li>{" "}
          <li>Player 1 used Lightning Bolt..</li>
          <li>Player 2 used Shields..</li>
          <li>Boss Attacks Player 2...</li>
        </ul>
      </div>
      <div className="absolute bottom-[8%] w-full">
        <StyledLink
          href="#"
          className="motion-preset-bounce mb-2 px-8 py-4 text-3xl opacity-50 motion-delay-300"
          spanClassName="bg-brown-gradient border-black"
        >
          ENGAGED IN BATTLE
        </StyledLink>
      </div>
    </>
  );
}
