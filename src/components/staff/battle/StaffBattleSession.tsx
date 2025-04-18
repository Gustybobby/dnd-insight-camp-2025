"use client";

import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";
import type {
  Item,
  ModEffectCreate,
  Skill,
  StatTypeEnum,
} from "@/server/domain/models";
import type { OnSubmitSkillInput } from "../players/PlayerCharacterStaff";

import { ALL_STAT_TYPES } from "@/shared/stat";

import {
  bossEndTurn,
  endTurn,
  getActivitySession,
  updateActivitySession,
} from "@/server/controllers/activity.controller";
import { createModEffect } from "@/server/controllers/effect.controller";
import {
  addPlayerItem,
  getAllItems,
} from "@/server/controllers/items.controller";
import {
  addPlayerSkill,
  getAllSkills,
} from "@/server/controllers/skill.controller";

import { useState } from "react";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import ItemModal from "../players/ItemModal";
import SkillModal from "../players/SkillModal";
import StaffPlayerItems from "../players/StaffPlayerItems";
import StaffPlayerSkills from "../players/StaffPlayerSkills";
import { StaffPlayerStats } from "../players/StaffPlayerStats";
import { StaffPlayerUtils } from "../players/StaffPlayerUtils";
import StyledButton from "../StyledButton";
import TopNav from "../TopNav";
import StaffBattlePlayersInfo from "./StaffBattleSessionPlayersInfo";
import StaffBattleSessionPlayerTabs from "./StaffBattleSessionPlayerTabs";
import { fetchAllPlayersInfo } from "@/bff/api/players.api";

export interface OnSubmitItemInput {
  itemId: number;
  amount: number;
}

export interface EndBattleMutationType {
  sessionId: number;
}

export default function StaffBattleSession({
  sessionId,
}: {
  sessionId: number;
}) {
  //Stats
  const endBossMutation = useMutation({
    mutationFn: () => bossEndTurn({ playerId: 1, sessionId: sessionId }),
    onSuccess: async () => {
      await refetchActivitySession();
    },
  });

  const endPlayerTurnMutation = useMutation({
    mutationFn: ({ playerId }: { playerId: number }) =>
      endTurn({ playerId: playerId, sessionId: sessionId }),
    onSuccess: async () => {
      await refetchActivitySession();
    },
  });

  const endBattleMutation = useMutation({
    mutationFn: ({ sessionId }: EndBattleMutationType) =>
      updateActivitySession({
        sessionId: sessionId,
        data: { isActive: false },
      }),
    onSuccess: async (data) => {
      console.log("Player turn updated successfully", data);
    },
  });

  const { data: activitySession, refetch: refetchActivitySession } = useQuery({
    queryKey: ["getActivitySession", sessionId],
    queryFn: async () => {
      const activitySession = await getActivitySession({
        sessionId: sessionId,
      });
      if (activitySession !== null) {
        setCurrentPlayerId(getCurrentTurnPlayerId(activitySession));
        return activitySession;
      }
      return null;
    },

    refetchInterval: 10000,
  });

  const { data: allPlayers, refetch: refetchAllPlayerInfos } = useQuery({
    queryKey: ["getAllPlayers", sessionId],
    queryFn: async () => await fetchAllPlayersInfo(),
    refetchInterval: 10000,
  });

  const players = allPlayers
    ?.filter((player) => {
      return activitySession?.turns.some((turn) => turn.playerId === player.id);
    })
    .map((player) => {
      return {
        ...player,
        order:
          activitySession?.turns.find((turn) => turn.playerId === player.id)
            ?.order ?? -1,
      };
    })
    .sort((a, b) => a.order - b.order);
  console.log("Players : ", players);

  const [selectedPlayerId, setSelectedPlayerId] = useState<number>(1);
  const [currentPlayerId, setCurrentPlayerId] = useState<number | null>(null);

  const statMutation = useMutation({
    mutationFn: (modEffectCreate: ModEffectCreate) =>
      createModEffect({
        data: { ...modEffectCreate },
        playerIds: [+selectedPlayerId],
      }),
    onSuccess: () => {},
  });

  const onStatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const statChange = Object.fromEntries(
      formData.entries().filter(([, value]) => +value !== 0),
    );
    const mutationPromises = Object.entries(statChange).map(
      async ([key, value]) => {
        return await statMutation.mutateAsync({
          stat: key as StatTypeEnum,
          value: +value,
          itemId: null,
        });
      },
    );
    Promise.all(mutationPromises)
      .then(() => {
        void refetchAllPlayerInfos();
        alert("Stats has been changed successfully!")
      })
      .catch((e) => {
        alert(`Error changing stat: ${e}`);
      });
    e.currentTarget.reset();
  };

  //Items
  const itemMutation = useMutation({
    mutationFn: ({ itemId, amount }: OnSubmitItemInput) =>
      addPlayerItem({
        data: {
          itemId: itemId,
          playerId: selectedPlayerId ?? 0,
          amount: amount,
        },
      }),
    onSuccess: () => {
      // Refetch the items or update the state to reflect the new item
      alert("Item given successfully!");
    },
  });

  const { data: items } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: async () => await getAllItems(),
  });
  const onItemSubmit = async ({ itemId, amount }: OnSubmitItemInput) => {
    console.log(itemId, amount);
    itemMutation.mutate({ itemId, amount });
  };

  //Skills
  const { data: skills } = useQuery({
    queryKey: ["getAllSkills"],
    queryFn: async () => await getAllSkills(),
    refetchInterval: 10000,
  });

  const skillMutation = useMutation({
    mutationFn: ({ skillId, remainingUses }: OnSubmitSkillInput) =>
      addPlayerSkill({
        data: {
          playerId: selectedPlayerId ?? 0,
          skillId: skillId,
          remainingUses: remainingUses,
        },
      }),
    onSuccess: () => {
      // Refetch the items or update the state to reflect the new item
      alert("Item given successfully!");
    },
  });

  const onSkillSubmit = async ({
    skillId,
    remainingUses,
  }: OnSubmitSkillInput) => {
    console.log({
      playerId: selectedPlayerId,
      skillId: skillId,
      remainingUses: remainingUses,
    });

    skillMutation.mutate({ skillId, remainingUses });
  };

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const openModal = ({
    label,
    data,
  }: {
    label: string;
    data: Item | Skill;
  }) => {
    if (label === "Item") {
      setItem(data as Item);
    }
    if (label === "Skill") {
      setSkill(data as Skill);
    }
    setModalIsOpen(true);
  };

  const [item, setItem] = React.useState<Item | null>(null);
  const [skill, setSkill] = React.useState<Skill | null>(null);

  const handleEndBossTurn = () => {
    endBossMutation.mutate();
  };
  const handleEndBattle = () => {
    endBattleMutation.mutate({ sessionId: sessionId });
    redirect("/staff");
  };

  const handleEndPlayerTurn = () => {
    setCurrentPlayerId(getCurrentTurnPlayerId(activitySession ?? null));
    endPlayerTurnMutation.mutate({
      playerId: currentPlayerId ?? 0,
    });
  };

  const handleSessionPlayerRowClick = (playerId: number) => {
    console.log(playerId);
    setSelectedPlayerId(playerId);
  };

  console.log("Current player id", currentPlayerId);

  return (
    <div className="flex w-full flex-col">
      <TopNav backLink="/staff" title={`Battle Session ${sessionId}`} />
      <div className="grid max-h-[100%] w-full grid-cols-2">
        <div className="grid grid-rows-2">
          <div className="flex flex-col">
            <StaffBattlePlayersInfo
              players={players}
              selectedPlayerId={selectedPlayerId}
              activitySession={activitySession}
              onSessionPlayerRowClick={handleSessionPlayerRowClick}
              currentPlayerId={currentPlayerId ?? -1}
            />
            <StyledButton
              disabled={activitySession?.currentTurnId === null}
              onClick={() => handleEndPlayerTurn()}
            >
              {currentPlayerId
                ? `End Group ${currentPlayerId} Turn`
                : `End Group Turn`}
            </StyledButton>
            <StyledButton
              className={`${activitySession?.currentTurnId === 1}`}
              onClick={() => handleEndBossTurn()}
              disabled={activitySession?.currentTurnId !== null}
            >
              End Boss Turn
            </StyledButton>
            <StyledButton
              className="bg-red-900 text-white"
              onClick={() => handleEndBattle()}
            >
              End Battle
            </StyledButton>
          </div>
          {/* Not necessary but is good to have */}
          <StaffBattleSessionPlayerTabs
            tabs={[
              {
                label: "Status",
                node: <></>,
                modal: <></>,
              },
              {
                label: "Equipment",
                node: <></>,
                modal: <></>,
              },
              {
                label: "Inventory",
                node: <></>,
                modal: <></>,
              },
            ]}
            defaultTab={""}
            className={"h-full"}
          ></StaffBattleSessionPlayerTabs>
        </div>
        <StaffPlayerUtils
          tabs={[
            {
              label: "Stats",
              node: (
                <StaffPlayerStats
                  playerStats={ALL_STAT_TYPES.map(
                    (type) =>
                      players
                        ?.find((player) => player.id === selectedPlayerId)
                        ?.stats.find((stat) => stat.type === type) ?? {
                        type,
                        value: 0,
                        playerId: 0,
                      },
                  )}
                  onSubmit={onStatSubmit}
                />
              ),
              modal: <></>,
            },
            {
              label: "Item",
              node: (
                <StaffPlayerItems
                  items={items ?? null}
                  onClickItem={openModal}
                />
              ),
              modal: (
                <ItemModal
                  item={item ?? null}
                  modalOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
                  playerName={
                    players?.find((player) => player.id === selectedPlayerId)
                      ?.name
                  }
                  onSubmit={() =>
                    onItemSubmit({ itemId: item?.id ?? 0, amount: 0 })
                  }
                />
              ),
            },
            {
              label: "Skills",
              node: (
                <StaffPlayerSkills
                  skills={skills ?? null}
                  onClickSkill={openModal}
                />
              ),
              modal: (
                <SkillModal
                  skill={skill ?? null}
                  modalOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
                  onSubmit={() =>
                    onSkillSubmit({ skillId: skill?.id ?? 0, remainingUses: 0 })
                  }
                ></SkillModal>
              ),
            },
          ]}
          defaultTab="Stats"
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
        />
      </div>
    </div>
  );
}

function getCurrentTurnPlayerId(
  activitySession: ActivitySessionAllInfo | null,
) {
  return (
    activitySession?.turns.find(
      (turn) => turn.id === activitySession.currentTurnId,
    )?.playerId ?? null
  );
}
