"use client";

import { ORDERED_STAT_TYPES } from "@/shared/stat";

import {
  endTurn,
  getActivitySession,
} from "@/server/controllers/activity.controller";

import { useMutation, useQuery } from "@tanstack/react-query";
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
import { StyledLink } from "@/components/ui/link";
import { cn } from "@/components/utils";

export function ActivityPlayer({
  sessionId,
  playerId,
  isPlayer,
  className,
}: {
  sessionId: number;
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

  const { data: session, refetch: refetchSession } = useQuery({
    queryKey: ["getActivitySession", sessionId],
    queryFn: async () => await getActivitySession({ sessionId }),
    refetchInterval: 5000,
  });

  const endTurnMutation = useMutation({ mutationFn: endTurn });

  const sessionInActive = session?.isActive === false;
  const playerNotInSession = session?.turns.every(
    (turn) => turn.playerId !== playerId,
  );
  if (
    playerAllInfo === null ||
    session === null ||
    sessionInActive ||
    playerNotInSession
  ) {
    router.replace("/players");
    return;
  }

  const currentHealth =
    playerAllInfo?.stats?.find((stat) => stat.type === "HP")?.value ?? 0;

  const isCurrentTurn =
    session?.currentTurnId === session?.turns.find((turn) => turn.playerId)?.id;

  return (
    <div
      className={cn(
        "mx-auto mt-[20%] w-11/12 space-y-2 overflow-auto py-2",
        className,
      )}
    >
      <CharacterBox
        className={cn(
          "relative z-10 min-h-[38vh] p-2",
          window.type === "character"
            ? "bg-cream/50"
            : "bg-[url(/asset/cover/paper_texture.jpg)]",
        )}
      >
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
            <div className="flex w-full items-center justify-between">
              <HealthBar
                health={currentHealth}
                max={Math.max(100, currentHealth)}
              />
              <StyledLink
                href="#"
                className={cn(
                  "motion-preset-bounce mb-2 px-4 py-2 text-lg motion-delay-300",
                  isCurrentTurn ? "" : "opacity-50",
                )}
                spanClassName="bg-brown-gradient border-black"
                onClick={async () => {
                  if (!isCurrentTurn) {
                    return;
                  }
                  await endTurnMutation.mutateAsync({ playerId, sessionId });
                  void refetchSession();
                }}
              >
                <p className="w-20 text-center">End Turn</p>
              </StyledLink>
            </div>
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
            showPlayerOptions={isPlayer}
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
          { label: "Status", node: <div></div> },
          {
            label: "Inventory",
            node: (
              <>
                {playerAllInfo?.playerItems && (
                  <Inventory
                    items={playerAllInfo.playerItems}
                    onClick={(item) =>
                      setWindow({ type: "itemInfo", itemId: item.id })
                    }
                  />
                )}
              </>
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
