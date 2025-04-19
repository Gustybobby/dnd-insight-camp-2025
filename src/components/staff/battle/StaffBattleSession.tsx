"use client";

import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";
import type {
  EffectTypeEnum,
  Item,
  ModEffectCreate,
  Skill,
  StatTypeEnum,
} from "@/server/domain/models";
import type { StatusType } from "../constants";
import type { OnSubmitSkillInput } from "../players/PlayerCharacterStaff";
import type { statLowerCaseType } from "./type";

import { ALL_STAT_TYPES } from "@/shared/stat";

import {
  bossEndTurn,
  endTurn,
  getActivitySession,
  updateActivitySession,
} from "@/server/controllers/activity.controller";
import {
  createModEffect,
  createVisualEffect,
} from "@/server/controllers/effect.controller";
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

import { DEFAULT_ITEM_AMOUNT, DEFAULT_SKILL_USES } from "../constants";
import ItemModal from "../players/ItemModal";
import SkillLogModal from "../players/SkillLogModal";
import SkillModal from "../players/SkillModal";
import StaffPlayerItems from "../players/StaffPlayerItems";
import StaffPlayerSkills from "../players/StaffPlayerSkills";
import { StaffPlayerStats } from "../players/StaffPlayerStats";
import StaffPlayerStatuses from "../players/StaffPlayerStatuses";
import { StaffPlayerUtils } from "../players/StaffPlayerUtils";
import StatusModal from "../players/StatusModal";
import StyledButton from "../StyledButton";
import TopNav from "../TopNav";
import StaffBattleSessionBoss from "./StaffBattleSessionBoss";
import StaffBattleSessionPlayerLogsTab from "./StaffBattleSessionPlayerLogsTabs";
import StaffBattlePlayersInfo from "./StaffBattleSessionPlayersInfo";
import StaffBattleSessionPlayerStatusTab from "./StaffBattleSessionPlayerStatusTab";
import StaffBattleSessionPlayerTabs from "./StaffBattleSessionPlayerTabs";
import { fetchAllPlayersInfo } from "@/bff/api/players.api";
import { mapNumToAlphabet } from "@/components/utils";

export interface OnSubmitItemInput {
  itemId: number;
  amount: number;
}

export interface onSubmitStatusInput {
  effectType: EffectTypeEnum;
  playerIds: number[];
  countdown: number;
}

export interface EndBattleMutationType {
  sessionId: number;
}

export interface BossStatsStateType {
  hp: number;
  str: number;
  dex: number;
  chr: number;
  int: number;
}

export interface DamageCalculator {
  roll: string;
  multiply: string;
  stat: statLowerCaseType;
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
      Promise.all([refetchActivitySession(), refetchAllPlayerInfos])
        .then(() => {
          console.log("success!");
        })
        .catch((e) => {
          alert(`An error has occurred refetching data: ${e}`);
        });
    },
  });

  const endPlayerTurnMutation = useMutation({
    mutationFn: ({ playerId }: { playerId: number }) =>
      endTurn({ playerId: playerId, sessionId: sessionId }),
    onSuccess: async () => {
      Promise.all([refetchActivitySession(), refetchAllPlayerInfos])
        .then(() => {
          console.log("success!");
        })
        .catch((e) => {
          alert(`An error has occurred refetching data: ${e}`);
        });
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

    refetchInterval: 2000,
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

  const createVFXMutation = useMutation({
    mutationFn: createVisualEffect,
    onSuccess: () => {},
  });

  const onStatSubmit = async (
    stats: { stat: StatTypeEnum; value: number }[],
  ) => {
    const mutationPromises = stats.map(({ stat, value }) => {
      return statMutation.mutateAsync({ stat, value, itemId: null });
    });
    Promise.all(mutationPromises)
      .then(() => {
        void refetchAllPlayerInfos();
        alert("Stats has been changed successfully!");
      })
      .catch((e) => {
        alert(`Error changing stat: ${e}`);
      });
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
    mutationFn: ({ skillId }: OnSubmitSkillInput) =>
      addPlayerSkill({
        data: {
          playerId: selectedPlayerId ?? 0,
          skillId: skillId,
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

  const onStatusSubmit = async ({
    effectType,
    playerIds,
    countdown,
  }: onSubmitStatusInput) => {
    console.log(effectType, playerIds, countdown);
    createVFXMutation.mutate({ effectType, playerIds, countdown });
  };

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalPlayerTabIsOpen, setModalPlayerTabIsOpen] = React.useState(false);

  const openModal = ({
    label,
    data,
  }: {
    label: string;
    data: Item | Skill | StatusType;
  }) => {
    if (label === "Item") {
      setItem(data as Item);
    }
    if (label === "Skill") {
      setSkill(data as Skill);
    }
    if (label === "Status") {
      setStatusType(data as StatusType);
    }
    setModalIsOpen(true);
  };

  const openPlayerTabModal = ({
    label,
    data,
  }: {
    label: string;
    data: string;
  }) => {
    if (label === "Logs") {
      const clickedSkill = skills?.find(
        (skill) => skill.name === (data as string),
      );
      if (clickedSkill) {
        console.log(clickedSkill);
        setSkillLog(clickedSkill);
      }
    }
    setModalPlayerTabIsOpen(true);
  };

  const [item, setItem] = React.useState<Item | null>(null);
  const [skill, setSkill] = React.useState<Skill | null>(null);
  const [skillLog, setSkillLog] = React.useState<Skill | null>(null);
  const [statusType, setStatusType] = React.useState<StatusType | null>(null);

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
    const player = players?.find((player) => player.id === playerId);
    if (!player) return;

    setSelectedPlayerId(playerId);

    const newStats: BossStatsStateType = { ...selectedPlayerBossStats };

    player.stats.forEach((stat) => {
      newStats[stat.type.toLowerCase() as statLowerCaseType] = stat.value;
    });
    console.log("New Player Stats :", newStats);

    setSelectedPlayerBossStats(newStats);
  };

  const [bossStats, setBossStats] = useState<BossStatsStateType>({
    hp: 200,
    dex: 10,
    int: 10,
    chr: 10,
    str: 10,
  });
  const [selectedPlayerBossStats, setSelectedPlayerBossStats] =
    useState<BossStatsStateType>({
      hp: 200,
      dex: 10,
      int: 10,
      chr: 10,
      str: 10,
    });

  const [bossDamageToPlayerCalculator, setBossDamageToPlayerCalculator] =
    useState<DamageCalculator>({
      stat: "str",
      roll: "1",
      multiply: "1.5",
    });

  const [playerDamageToBossCalculator, setPlayerDamageToBossCalculator] =
    useState<DamageCalculator>({
      stat: "str",
      roll: "1",
      multiply: "1.5",
    });

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
                ? `End Group ${mapNumToAlphabet(currentPlayerId)} Turn`
                : `End Group Turn`}
            </StyledButton>
            <StyledButton
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
                node: (
                  <StaffBattleSessionPlayerStatusTab
                    player={players?.find(
                      (player) => player.id === selectedPlayerId,
                    )}
                  />
                ),
                modal: <></>,
              },
              {
                label: "Logs",
                node: (
                  <StaffBattleSessionPlayerLogsTab
                    battleSession={activitySession}
                    onClickLog={openPlayerTabModal}
                  />
                ),
                modal: (
                  <SkillLogModal
                    skill={skillLog ?? null}
                    closeModal={() => setModalPlayerTabIsOpen(false)}
                  />
                ),
              },
              // {
              //   label: "Equipment",
              //   node: <></>,
              //   modal: <></>,
              // },
              // {
              //   label: "Inventory",
              //   node: <></>,
              //   modal: <></>,
              // },
            ]}
            defaultTab={"Status"}
            className={"h-full"}
            isModalOpen={modalPlayerTabIsOpen}
            setIsModalOpen={setModalPlayerTabIsOpen}
          />
        </div>
        <StaffPlayerUtils
          tabs={[
            {
              label: "Boss",
              node: (
                <StaffBattleSessionBoss
                  bossStats={bossStats}
                  setBossStats={setBossStats}
                  bossDamageToPlayerCalculator={bossDamageToPlayerCalculator}
                  setBossDamageToPlayerCalculator={
                    setBossDamageToPlayerCalculator
                  }
                  selectedPlayerBossStats={selectedPlayerBossStats}
                  playerDamageToBossCalculator={playerDamageToBossCalculator}
                  setPlayerDamageToBossCalculator={
                    setPlayerDamageToBossCalculator
                  }
                />
              ),
              modal: <></>,
            },
            {
              label: "Player",
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
                    onItemSubmit({
                      itemId: item?.id ?? 0,
                      amount: DEFAULT_ITEM_AMOUNT,
                    })
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
                    onSkillSubmit({
                      skillId: skill?.id ?? 0,
                      remainingUses: DEFAULT_SKILL_USES,
                    })
                  }
                />
              ),
            },
            {
              label: "Status",
              node: <StaffPlayerStatuses onClickStatus={openModal} />,
              modal: (
                <StatusModal
                  selectedPlayerId={selectedPlayerId}
                  status={statusType}
                  modalOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
                  onSubmit={onStatusSubmit}
                  submitButtonText={"Give Status"}
                />
              ),
            },
          ]}
          defaultTab="Boss"
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
