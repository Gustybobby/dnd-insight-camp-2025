"use client";

import { DEFAULT_STAT_VALUES, ORDERED_STAT_TYPES } from "@/shared/stat";

import { clearVisualEffect } from "@/server/controllers/effect.controller";
import { deletePlayerItem } from "@/server/controllers/items.controller";
import { removePlayerSkill } from "@/server/controllers/skill.controller";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useCharacter } from "@/components/hooks/useCharacter";
import {
  usePlayerItems,
  usePlayerWindow,
} from "@/components/hooks/usePlayerWindow";
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

const REFETCH_INTERVAL = 3 * 1000;

export function PlayerCharacter({
  playerId,
  isPlayer,
  isStaff,
  className,
}: {
  playerId: number;
  isPlayer: boolean;
  isStaff?: boolean;
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
  } = useCharacter({ playerId, refetchInterval: REFETCH_INTERVAL, popper });

  const playerItemsWindow = usePlayerItems(playerAllInfo ?? {});

  const deletePlayerItemMutation = useMutation({
    mutationFn: deletePlayerItem,
  });

  const removePlayerSkillMutation = useMutation({
    mutationFn: removePlayerSkill,
  });

  const clearVisualEffectMutation = useMutation({
    mutationFn: clearVisualEffect,
  });

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
              max={Math.max(DEFAULT_STAT_VALUES[4], currentHealth)}
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
            showPlayerOptions={isPlayer}
            showStaffOptions={isStaff}
            item={
              playerItemsWindow.getItemById(window.itemId)?.item ??
              playerItemsWindow.getEquipmentById(window.itemId)?.item ??
              null
            }
            equipped={!!playerItemsWindow.getEquipmentById(window.itemId)}
            partEquipped={playerItemsWindow.isPartEquipped(window.itemId)}
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
            onUngive={async (itemId, isEquipped) => {
              if (isEquipped) {
                await removeMutation.mutateAsync({ playerId, itemId });
                setWindow({ type: "character" });
              }
              await deletePlayerItemMutation.mutateAsync({ playerId, itemId });
              await refetch();
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
            showStaffOptions={isStaff}
            onClickBack={() => setWindow({ type: "character" })}
            onUse={(skillId) => {
              void useSkillMutation
                .mutateAsync({ playerId, skillId })
                .then(() => {
                  void refetch();
                });
            }}
            onUngive={async (skillId) => {
              void removePlayerSkillMutation
                .mutateAsync({ playerId, skillId })
                .then(() => {
                  void refetch();
                });
              setWindow({ type: "character" });
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
              <PlayerStatusesTab
                effects={playerAllInfo.effects}
                showStaffOptions={isStaff}
                onClear={async (effectId) => {
                  await clearVisualEffectMutation.mutateAsync({
                    playerId,
                    effectId,
                  });
                  void refetch();
                }}
              />
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
