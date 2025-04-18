"use client";

import { getAllCharacters } from "@/server/controllers/character.controller";
import {
  getPlayer,
  getPlayerCharacter,
  updatePlayer,
} from "@/server/controllers/player.controller";

import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  CarouselPreview,
  CharacterCarousel,
} from "@/components/players/CharacterCarousel";
import { TitleBanner } from "@/components/players/components";
import { StyledLink } from "@/components/ui/link";
import { cn } from "@/components/utils";

export function CharacterSelectMenu({
  playerId,
  isPlayer,
}: {
  playerId: number;
  isPlayer: boolean;
}) {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const prevIdxRef = useRef<number | null>(null);

  const { data: characters } = useQuery({
    queryKey: ["getAllCharacters"],
    queryFn: async () => await getAllCharacters(),
  });

  const { data, refetch: refetchPlayer } = useQuery({
    refetchOnMount: false,
    queryKey: ["getPlayerCharacter", playerId, characters],
    queryFn: async () => {
      const player = await getPlayer({ playerId });
      const playerCharacter = await getPlayerCharacter({ playerId });
      if (characters && playerCharacter && currentIdx === null) {
        const initialIdx = characters.findIndex(
          (character) => character.id === playerCharacter.id,
        );
        prevIdxRef.current = initialIdx;
        setCurrentIdx(initialIdx);
      }
      return { player, playerCharacter };
    },
    refetchInterval: 5000,
  });

  const updatePlayerMutation = useMutation({ mutationFn: updatePlayer });

  if (!data) {
    return null;
  }

  const { player, playerCharacter } = data;

  if (currentIdx === null) {
    return null;
  }

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
    return (prevIdxRef.current ?? 0) > (currentIdx ?? 0);
  }

  const character = characters?.[currentIdx];

  if (!character || !player) {
    return null;
  }

  const isCharacterChosen = character.id === playerCharacter?.id;

  return (
    <>
      <div className="absolute left-0 right-0 top-[15%] mx-auto flex w-full flex-col items-center justify-center">
        <div className="w-80">
          <TitleBanner>
            <input
              id={"player_name"}
              className="w-40 rounded-md border border-black bg-transparent text-center font-[family-name:var(--noto-sans-thai)]"
              defaultValue={player.name}
            />
          </TitleBanner>
          <div className="-mt-6 flex w-full justify-center">
            <StyledLink
              href="#"
              onClick={async () => {
                await updatePlayerMutation.mutateAsync({
                  playerId,
                  data: {
                    name: (
                      document.getElementById(
                        "player_name",
                      ) as HTMLInputElement | null
                    )?.value,
                  },
                });
                await refetchPlayer();
              }}
            >
              Save Name
            </StyledLink>
          </div>
        </div>
      </div>

      <CharacterCarousel
        className="absolute -top-[10%] bottom-0 left-0 right-0 m-auto flex h-[30%] w-11/12 items-center justify-between gap-2"
        character={character}
        slideFromRight={slideInFromRight()}
        onClickLeft={() => {
          prevIdxRef.current = currentIdx;
          setCurrentIdx((idx) =>
            idx === 0 ? characters.length - 1 : (idx ?? 0) - 1,
          );
        }}
        onClickRight={() => {
          prevIdxRef.current = currentIdx;
          setCurrentIdx((idx) =>
            idx === characters.length - 1 ? 0 : (idx ?? 0) + 1,
          );
        }}
      />

      <CarouselPreview
        className="absolute bottom-[22%] left-0 right-0 mx-auto w-[20%]"
        characters={characters}
        currentIdx={currentIdx}
        slideFromRight={slideInFromRight()}
      />

      <div className="absolute bottom-[8%] w-full">
        {isPlayer && (
          <StyledLink
            href="#"
            className={cn(
              "motion-preset-bounce mb-2 px-8 py-4 text-3xl motion-delay-300",
              isCharacterChosen ? "opacity-50" : "",
            )}
            spanClassName="bg-brown-gradient border-black"
            onClick={async () => {
              if (isCharacterChosen) {
                return;
              }
              await updatePlayerMutation.mutateAsync({
                playerId,
                data: { characterId: character.id },
              });
              await refetchPlayer();
            }}
          >
            {isCharacterChosen ? "Chosen" : "Choose Character"}
          </StyledLink>
        )}
      </div>
    </>
  );
}
