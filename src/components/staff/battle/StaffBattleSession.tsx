"use client";

// import type { StatTypeEnum } from "@/server/domain/models";
// import type { ModEffectCreate } from "@/server/domain/models/effect.model";

// import { ALL_STAT_TYPES } from "@/shared/stat";

// import { createModEffect } from "@/server/controllers/effect.controller";
// import {
//   addPlayerItem,
//   getAllItems,
// } from "@/server/controllers/items.controller";
import { getActivitySession } from "@/server/controllers/activity.controller";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";

// import ItemModal from "../players/ItemModal";
// import SkillModal from "../players/SkillModal";
// import StaffPlayerSkills from "../players/StaffPlayerSkills";
// import { StaffPlayerStats } from "../players/StaffPlayerStats";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// import { PlayerWithAllInfo } from "@/server/domain/aggregates";
import StaffBattlePlayersInfo from "./StaffBattlePlayersInfo";
// import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";
// import { StaffPlayerUtils } from "@/components/staff/players/StaffPlayerUtils";
import Link from "next/link";

export interface OnSubmitItemInput {
  itemId: number;
  amount: number;
}

export default function StaffBattleSession({
  sessionId,
  // players
}: {
  sessionId: number;
  // players: PlayerWithAllInfo[];
}) {
  //Stats
  const { data: activitySession } = useQuery({
    queryKey: ["getActivitySession", sessionId],
    queryFn: async () => await getActivitySession({ sessionId: sessionId }),
    refetchInterval: 5000,
  });

  const { data: allPlayers } = useQuery({
    queryKey: ["getAllPlayers", sessionId],
    queryFn: async () => await getAllPlayersInfo(),
    refetchInterval: 5000,
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
    });

  // const statMutation = useMutation({
  //   mutationFn: (modEffectCreate: ModEffectCreate) =>
  //     createModEffect({ data: { ...modEffectCreate }, playerIds: [+playerId] }),
  //   onSuccess: () => {
  //     alert("Stat changed successfully!");
  //   },
  // });

  // const onStatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const statChange = Object.fromEntries(
  //     formData.entries().filter(([, value]) => +value !== 0),
  //   );
  //   const mutationPromises = Object.entries(statChange).map(([key, value]) => {
  //     return statMutation.mutateAsync({
  //       stat: key as StatTypeEnum,
  //       value: +value,
  //       itemId: null,
  //     });
  //   });
  //   Promise.all(mutationPromises)
  //     .then(() => {
  //       void refetchPlayerStats();
  //     })
  //     .catch((e) => {
  //       alert(`Error changing stat: ${e}`);
  //     });
  //   e.currentTarget.reset();
  // };

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  //Items
  // const itemMutation = useMutation({
  //   mutationFn: ({ itemId, amount }: OnSubmitItemInput) =>
  //     addPlayerItem({
  //       data: { itemId: itemId, playerId: playerId, amount: amount },
  //     }),
  //   onSuccess: () => {
  //     // Refetch the items or update the state to reflect the new item
  //     alert("Item given successfully!");
  //   },
  // });

  // const { data: items } = useQuery({
  //   queryKey: ["getAllItems"],
  //   queryFn: async () => await getAllItems(),
  //   refetchInterval: 10000,
  // });
  // const onItemSubmit = async ({ itemId, amount }: OnSubmitItemInput) => {
  //   console.log(itemId, amount);
  //   itemMutation.mutate({ itemId, amount });
  // };
  // useEffect(() => {}), [selectedPlayerId];
  return (
    <div className="flex w-full flex-col">
      <div className="px-4">
        <div className="flex w-full flex-row justify-between rounded-md border-2 border-oldcream bg-cream px-4 py-2 text-xl">
          <Link href={"/staff"} className="">
            Back
          </Link>
          <h1 className="text-center">{`Battle Session ${sessionId}`}</h1>
        </div>
      </div>
      <div className="grid max-h-[100%] w-full grid-cols-2 gap-x-4 overflow-y-auto">
        {/* <PlayerCharacter playerId={playerId} isPlayer={true} className="mt-0" /> */}
        <StaffBattlePlayersInfo
          players={players}
          selectedPlayerId={selectedPlayerId}
          setSelectedPlayerId={setSelectedPlayerId}
        ></StaffBattlePlayersInfo>
        {/* <StaffPlayerUtils
          tabs={[
            {
              label: "Stats",
              node: (
                <StaffPlayerStats
                  playerStats={ALL_STAT_TYPES.map(
                    (type) =>
                      playerStats?.find((stat) => stat.type === type) ?? {
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
                <StaffPlayerItem
                  items={items ?? null}
                  onClickItem={openModal}
                />
              ),
              modal: (
                <ItemModal
                  item={item ?? null}
                  modalOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
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
        /> */}
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4 overflow-y-auto bg-radial-gradient from-darkred to-dark"></div>
    </div>
  );
}
