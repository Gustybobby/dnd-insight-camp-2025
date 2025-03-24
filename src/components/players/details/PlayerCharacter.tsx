"use client";

import {
  getPlayerCharacter,
  getPlayerItems,
  getPlayerStats,
} from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { usePlayerWindow } from "@/components/hooks/usePlayerWindow";
import { CharacterBox } from "@/components/players/components";
import { CharacterInfo } from "@/components/players/details/character";
import { Inventory, ItemInfo } from "@/components/players/details/inventory";
import { PlayerTabs } from "@/components/players/details/PlayerTabs";
import {
  HealthBar,
  PlayerStats,
  StatInfo,
} from "@/components/players/details/stat";
import { clientOrderedStatTypes } from "@/components/players/style";
import { nonNullable } from "@/components/utils";

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

  const { data: playerItems } = useQuery({
    queryKey: ["getPlayerItems", playerId],
    queryFn: async () => await getPlayerItems({ playerId }),
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
        ) : window.type === "itemInfo" ? (
          <ItemInfo
            key={window.itemId}
            item={nonNullable(
              playerItems?.find(({ item }) => item.id === window.itemId)?.item,
            )}
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
          { label: "Status", node: <div></div> },
          {
            label: "Items",
            node: (
              <>
                {playerItems && (
                  <Inventory
                    items={playerItems}
                    onClick={(item) =>
                      setWindow({ type: "itemInfo", itemId: item.id })
                    }
                  />
                )}
              </>
            ),
          },
          { label: "Skills", node: <div></div> },
        ]}
        defaultTab="Stats"
      />
    </div>
  );
}
