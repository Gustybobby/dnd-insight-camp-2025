"use client";

import { ORDERED_STAT_TYPES } from "@/shared/stat";

import { useRouter } from "next/navigation";

import { useCharacter } from "@/components/hooks/useCharacter";
import { usePlayerWindow } from "@/components/hooks/usePlayerWindow";
import { Popups, usePopupEffect } from "@/components/hooks/usePopupEffect";
import { CharacterBox } from "@/components/players/components";
import { CharacterInfo } from "@/components/players/details/character";
import { Inventory, ItemInfo } from "@/components/players/details/inventory";
import { PlayerTabs } from "@/components/players/details/PlayerTabs";
import {
  PlayerSkillInfo,
  PlayerSkillsTab,
} from "@/components/players/details/skill";
import {
  HealthBar,
  PlayerStats,
  StatInfo,
} from "@/components/players/details/stat";
import { PlayerStatusesTab } from "@/components/players/details/status";
import { cn } from "@/components/utils";

export function PlayerCharacter({
  playerId,
  isPlayer,
  className,
}: {
  playerId: number;
  isPlayer: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { window, setWindow } = usePlayerWindow();
  const { popups, popper } = usePopupEffect();

  const {
    playerAllInfo,
    refetch,
    equipMutation,
    removeMutation,
    useSkillMutation,
  } = useCharacter({ playerId, refetchInterval: 5000, popper });

  if (playerAllInfo === null) {
    router.replace("/players");
    return;
  }

  const currentHealth =
    playerAllInfo?.stats?.find((stat) => stat.type === "HP")?.value ?? 0;

  return (
    <div
      className={cn(
        "mx-auto mt-[20%] w-11/12 space-y-2 overflow-auto py-2",
        className,
      )}
    >
      <CharacterBox className="relative z-10 min-h-[38vh] bg-[url(/asset/cover/paper_texture.jpg)] bg-center p-2">
        {window.type === "character" ? (
          <>
            <CharacterInfo
              playerId={playerId}
              character={playerAllInfo?.character ?? null}
              playerEquipments={playerAllInfo?.equipments ?? null}
              onClickEquipment={(itemId) =>
                setWindow({ type: "itemInfo", itemId })
              }
            />
            <div className="mx-auto h-0.5 w-11/12 bg-black" />
            <HealthBar
              health={currentHealth}
              max={Math.max(200, currentHealth)}
            />
          </>
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
              playerAllInfo?.playerItems?.find(
                ({ item }) => item.id === window.itemId,
              )?.item ??
              playerAllInfo?.equipments?.find(
                ({ item }) => item.id === window.itemId,
              )?.item ??
              null
            }
            equipped={
              playerAllInfo?.equipments?.some(
                ({ item }) => item.id === window.itemId,
              ) ?? false
            }
            partEquipped={
              !!playerAllInfo?.equipments.some(
                ({ item }) =>
                  item.type ===
                  playerAllInfo?.playerItems?.find(
                    ({ item }) => item.id === window.itemId,
                  )?.item.type,
              )
            }
            showPlayerOptions={isPlayer}
            onClickBack={() => setWindow({ type: "character" })}
            onEquip={(itemId) => {
              void equipMutation.mutateAsync({ playerId, itemId }).then(() => {
                void refetch();
              });
              setWindow({ type: "character" });
            }}
            onRemove={(itemId) => {
              void removeMutation.mutateAsync({ playerId, itemId }).then(() => {
                void refetch();
              });
              setWindow({ type: "character" });
            }}
          />
        ) : window.type === "skillInfo" ? (
          <PlayerSkillInfo
            playerSkill={
              playerAllInfo?.playerSkills?.find(
                (playerSkill) => playerSkill.skillId === window.skillId,
              ) ?? null
            }
            showPlayerOptions={false}
            onClickBack={() => setWindow({ type: "character" })}
            onUse={(skillId) => {
              void useSkillMutation
                .mutateAsync({ playerId, skillId })
                .then(() => {
                  void refetch();
                });
            }}
          />
        ) : null}
      </CharacterBox>
      <PlayerTabs
        tabs={[
          {
            label: "Stats",
            node: (
              <PlayerStats
                playerStats={ORDERED_STAT_TYPES.map(
                  (type) =>
                    playerAllInfo?.stats?.find(
                      (stat) => stat.type === type,
                    ) ?? {
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
          {
            label: "Status",
            node: playerAllInfo?.effects && (
              <PlayerStatusesTab effects={playerAllInfo.effects} />
            ),
          },
          {
            label: "Inventory",
            node: playerAllInfo?.playerItems && (
              <Inventory
                items={playerAllInfo.playerItems}
                onClick={(item) =>
                  setWindow({ type: "itemInfo", itemId: item.id })
                }
              />
            ),
          },
          {
            label: "Skills",
            node: playerAllInfo?.playerSkills && (
              <PlayerSkillsTab
                playerSkills={playerAllInfo.playerSkills}
                onClick={(skillId) => setWindow({ type: "skillInfo", skillId })}
              />
            ),
          },
        ]}
        defaultTab="Stats"
      />
      <Popups popups={popups} />
    </div>
  );
}
