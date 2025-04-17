"use client";

import { getActiveTurns } from "@/server/controllers/activity.controller";
import { getAllPlayers } from "@/server/controllers/player.controller";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  CarouselPreview,
  CharacterCarousel,
} from "@/components/players/CharacterCarousel";
import { TitleBanner } from "@/components/players/components";
import { StyledLink } from "@/components/ui/link";
import { cn } from "@/components/utils";

export function PlayerSelectMenu({
  playerId,
  isPlayer,
}: {
  playerId: number;
  isPlayer: boolean;
}) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const prevIdxRef = useRef(0);

  const { data: players } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayers(),
  });

  const { data: activeTurns } = useQuery({
    queryKey: ["getActiveTurns"],
    queryFn: async () => await getActiveTurns(),
    refetchInterval: 5000,
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

  if (!global || !character || !activeTurns) {
    return null;
  }

  const isCurrentPlayer = isPlayer && players?.[currentIdx].id === playerId;

  const currentPlayerTurn = activeTurns.find(
    (turn) => turn.playerId === players?.[currentIdx].id,
  );

  return (
    <>
      <div className="absolute left-0 right-0 top-[15%] mx-auto flex w-full flex-col items-center justify-center">
        <div className="w-80">
          <TitleBanner>Group {players?.[currentIdx].id}</TitleBanner>
        </div>
        <h2 className="motion-preset-fade z-30 w-48 px-4 py-2 text-center text-2xl font-semibold text-gold drop-shadow-md">
          {players?.[currentIdx].name}
        </h2>
      </div>

      <CharacterCarousel
        className="absolute -top-[10%] bottom-0 left-0 right-0 m-auto flex h-[30%] w-11/12 items-center justify-between gap-2"
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

      <h2 className="motion-preset-fade absolute bottom-[35%] left-0 right-0 mx-auto w-48 px-4 py-2 text-center font-[family-name:var(--noto-sans-thai)] text-xl font-semibold text-gold drop-shadow-md">
        {character.name}
      </h2>

      <CarouselPreview
        className="absolute bottom-[22%] left-0 right-0 mx-auto w-[20%]"
        characters={players.map((player) => player.character)}
        currentIdx={currentIdx}
        slideFromRight={slideInFromRight()}
      />

      <div className="absolute bottom-[8%] w-full">
        <StyledLink
          href={`/players/${players?.[currentIdx].id}`}
          className="motion-preset-bounce mb-2 px-8 py-4 text-3xl motion-delay-300"
          spanClassName="bg-brown-gradient border-black"
        >
          Character Insight
        </StyledLink>

        {!!currentPlayerTurn && (
          <StyledLink
            href={
              isCurrentPlayer
                ? `/activities/${currentPlayerTurn.sessionId}/players/${currentPlayerTurn.playerId}`
                : `/activities/${currentPlayerTurn.sessionId}`
            }
            className="motion-delay-400 motion-preset-bounce px-4 py-2 text-lg"
            spanClassName={
              isCurrentPlayer
                ? "bg-lightorange border-black"
                : "bg-radial-gradient border-black"
            }
          >
            <p
              className={cn(
                "",
                isCurrentPlayer
                  ? "font-bold text-black"
                  : "font-normal text-white",
              )}
            >
              {isCurrentPlayer ? "Enter Battle" : "View Battle"}
            </p>
          </StyledLink>
        )}
      </div>
    </>
  );
}
