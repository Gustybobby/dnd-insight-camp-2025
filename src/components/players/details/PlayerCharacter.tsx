"use client";

import { ORDERED_STAT_TYPES } from "@/shared/stat";

import { useRouter } from "next/navigation";

import { useCharacter } from "@/components/hooks/useCharacter";
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

export function PlayerCharacter({
  playerId,
  isPlayer,
}: {
  playerId: number;
  isPlayer: boolean;
}) {
  const router = useRouter();
  const { window, setWindow } = usePlayerWindow();

  const {
    character,
    playerStats,
    playerItems,
    playerEquipments,
    refetchStats,
    refetchItems,
    refetchEquipments,
    equipMutation,
    removeMutation,
  } = useCharacter({ playerId, refetchInterval: 5000 });

  if (character === null) {
    router.replace("/players");
    return;
  }

  return (
    <div className="mx-auto mt-[20%] w-11/12 space-y-2 overflow-auto py-2">
      <CharacterBox className="relative z-10 min-h-[38vh] p-2">
        {window.type === "character" ? (
          <CharacterInfo
            playerId={playerId}
            character={character ?? null}
            playerEquipments={playerEquipments ?? null}
            onClickEquipment={(itemId) =>
              setWindow({ type: "itemInfo", itemId })
            }
          />
        ) : window.type === "statInfo" ? (
          <StatInfo
            key={window.statType}
            type={window.statType}
            onClickBack={() => setWindow({ type: "character" })}
          />
        ) : window.type === "itemInfo" ? (
          <ItemInfo
            key={window.itemId}
            item={
              playerItems?.find(({ item }) => item.id === window.itemId)
                ?.item ??
              playerEquipments?.find(({ item }) => item.id === window.itemId)
                ?.item ??
              null
            }
            equipped={
              playerEquipments?.some(({ item }) => item.id === window.itemId) ??
              false
            }
            showPlayerOptions={isPlayer}
            onClickBack={() => setWindow({ type: "character" })}
            onEquip={(itemId) => {
              void equipMutation.mutateAsync({ playerId, itemId }).then(() => {
                void refetchStats();
                void refetchItems();
                void refetchEquipments();
              });
              setWindow({ type: "character" });
            }}
            onRemove={(itemId) => {
              void removeMutation.mutateAsync({ playerId, itemId }).then(() => {
                void refetchStats();
                void refetchItems();
                void refetchEquipments();
              });
              setWindow({ type: "character" });
            }}
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
                playerStats={ORDERED_STAT_TYPES.map(
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
