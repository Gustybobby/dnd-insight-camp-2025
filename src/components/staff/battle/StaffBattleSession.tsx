"use client";

import type { StatTypeEnum } from "@/server/domain/models";
import type { ModEffectCreate } from "@/server/domain/models/effect.model";

import { ALL_STAT_TYPES } from "@/shared/stat";

import { createModEffect } from "@/server/controllers/effect.controller";
import {
  addPlayerItem,
  getAllItems,
} from "@/server/controllers/items.controller";
import { getPlayerStats } from "@/server/controllers/player.controller";

import { useMutation, useQuery } from "@tanstack/react-query";

import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";
import { StaffPlayerUtils } from "@/components/staff/players/StaffPlayerUtils";
import Link from "next/link";
import {
  getActivitySession,
  getActivitySessions,
} from "@/server/controllers/activity.controller";
import { PlayerWithAllInfo } from "@/server/domain/aggregates";

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
  const { data: activitySession, refetch: refetchSession } = useQuery({
    queryKey: ["getActivitySession", sessionId],
    queryFn: async () => await getActivitySession({ sessionId: sessionId }),
    refetchInterval: 5000,
  });

  activitySession?.turns.forEach((turn) => {});

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
      <div className="grid w-full grid-cols-2 gap-x-4 overflow-y-auto bg-radial-gradient from-darkred to-dark"></div>
    </div>
  );
}
