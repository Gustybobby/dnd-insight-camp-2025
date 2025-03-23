"use client";

import type { Character } from "@/server/domain/models";

import {
  getPlayerCharacter,
  getPlayerStats,
} from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { usePlayerWindow } from "@/components/hooks/usePlayerWindow";
import {
  CharacterBox,
  HealthBar,
  TitleBanner,
} from "@/components/players/components";
import { CharacterModel } from "@/components/players/details/character";
import { EquipmentsBar } from "@/components/players/details/equipment";
import { PlayerTabs } from "@/components/players/details/PlayerTabs";
import { PlayerStats, StatInfo } from "@/components/players/details/stat";
import { clientOrderedStatTypes } from "@/components/players/style";

export function PlayerCharacter({ playerId }: { playerId: number }) {
  const router = useRouter();
  const { window, setWindow } = usePlayerWindow();

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
      <CharacterBox className="relative z-10 min-h-[38vh] p-2">
        {window.type === "character" ? (
          <CharacterInfo playerId={playerId} character={character ?? null} />
        ) : window.type === "statInfo" ? (
          <StatInfo
            key={window.statType}
            type={window.statType}
            onClickBack={() => setWindow({ type: "character" })}
          />
        ) : null}
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
                onClickIcon={(statType) =>
                  setWindow({ type: "statInfo", statType })
                }
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
