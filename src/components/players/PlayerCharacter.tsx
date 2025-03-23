"use client";

import type { Character, StatTypeEnum } from "@/server/domain/models";

import {
  getPlayerCharacter,
  getPlayerStats,
} from "@/server/controllers/player.controller";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  CharacterBox,
  CharacterModel,
  EquipmentsBar,
  HealthBar,
  TitleBanner,
} from "@/components/players/components";
import { PlayerTabs } from "@/components/players/PlayerTabs";
import { clientOrderedStatTypes } from "@/components/players/style";
import { PlayerStats, StatInfo } from "@/components/players/tabs/PlayerStats";
import { useRouter } from "next/navigation";

export function PlayerCharacter({ playerId }: { playerId: number }) {
  const router = useRouter();
  const [window, setWindow] = useState<"character" | StatTypeEnum>("character");

  const { data: character } = useQuery({
    queryKey: ["getPlayerCharacter", playerId],
    queryFn: async () => await getPlayerCharacter({ playerId }),
  });

  const { data: playerStats } = useQuery({
    queryKey: ["getPlayerStats", playerId],
    queryFn: async () => await getPlayerStats({ playerId }),
    refetchInterval: 5000,
  });

  if (character === null) {
    router.replace("/players");
    return;
  }

  return (
    <div className="mx-auto mt-[20%] w-11/12 space-y-2 overflow-auto py-2">
      <CharacterBox className="relative z-10 min-h-[32vh] p-2">
        {window === "character" ? (
          <CharacterInfo playerId={playerId} character={character ?? null} />
        ) : (
          <StatInfo type={window} onClickBack={() => setWindow("character")} />
        )}
      </CharacterBox>
      <CharacterBox className="relative z-10">
        <HealthBar
          health={playerStats?.find((stat) => stat.type === "HP")?.value ?? 0}
          max={100}
        />
      </CharacterBox>
      <PlayerTabs
        tabs={[
          {
            label: "Stats",
            node: (
              <PlayerStats
                playerStats={clientOrderedStatTypes.map(
                  (type) =>
                    playerStats?.find((stat) => stat.type === type) ?? {
                      type,
                      value: 0,
                      playerId: 0,
                    },
                )}
                onClickIcon={(type) => setWindow(type)}
              />
            ),
          },
          { label: "Inventory", node: <div></div> },
          { label: "Skills", node: <div></div> },
        ]}
        defaultTab="Stats"
      />
    </div>
  );
}

function CharacterInfo({
  playerId,
  character,
}: {
  playerId: number;
  character: Character | null;
}) {
  return (
    <>
      <TitleBanner>Group {playerId}</TitleBanner>
      <div className="grid grid-cols-3 place-items-center p-2 px-8">
        <div className="col-span-2">
          {character && <CharacterModel character={character} />}
        </div>
        <EquipmentsBar equipments={[]} />
      </div>
    </>
  );
}
