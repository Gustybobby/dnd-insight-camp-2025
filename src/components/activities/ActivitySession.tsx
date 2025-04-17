"use client";

import { getActivitySession } from "@/server/controllers/activity.controller";
import { getPlayerCharacter } from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";

import { TitleBanner } from "@/components/players/components";
import { StyledLink } from "@/components/ui/link";
import { cn } from "@/components/utils";
import Image from "next/image";

export function ActivitySession({ sessionId }: { sessionId: number }) {
  const { data: session } = useQuery({
    queryKey: ["getActivitySession", sessionId],
    queryFn: async () => await getActivitySession({ sessionId }),
    refetchInterval: 5000,
  });

  const { data: currentCharacter } = useQuery({
    queryKey: ["getPlayer", session],
    queryFn: async () => {
      const currentPlayerId = session?.turns.find(
        (turn) => turn.id === session.currentTurnId,
      )?.playerId;
      if (!currentPlayerId) {
        return null;
      }
      const player = await getPlayerCharacter({
        playerId: currentPlayerId,
      });
      return player;
    },
  });

  return (
    <>
      <div className="absolute left-0 right-0 top-[15%] mx-auto flex w-full flex-col items-center justify-center">
        <div className="w-80">
          <TitleBanner>Player 1 Turn</TitleBanner>
        </div>
      </div>
      {currentCharacter && (
        <div className="motion-preset-bounce absolute -top-[10%] bottom-0 left-0 right-0 m-auto flex h-[30%] w-11/12 items-center justify-center gap-2">
          <Image
            key={currentCharacter.id}
            src={currentCharacter.image}
            alt={currentCharacter.name}
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
          {session?.battleLogs.map((log, idx) => <li key={idx}>{log}</li>)}
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
