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
import { getActivitySessions } from "@/server/controllers/activity.controller";
import { PlayerWithAllInfo } from "@/server/domain/aggregates";

export interface OnSubmitItemInput {
  itemId: number;
  amount: number;
}

export default function StaffBattleSession({
  sessionId,
  activityId,
  players
}: {
  sessionId: number;
  activityId: number;
  players: PlayerWithAllInfo[];
}) {
  //Stats
  const { data: activitySessions, refetch: refetchSessions } = useQuery({
    queryKey: ["getPlayerStats", activityId],
    queryFn: async () => await getActivitySessions({ activityId: activityId }),
    refetchInterval: 5000,
  });

  const activitySession = activitySessions?.find((session) => session.id === sessionId);
  activitySession?.
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
    <div className="flex flex-col">
      <div className="px-4">
        <div className="flex w-full flex-row items-center justify-between rounded-md border-2 border-oldcream bg-cream px-4 py-2 text-xl">
          <Link href={"/staff"}>Back</Link>
          <h1>Player</h1>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4 overflow-y-auto bg-radial-gradient from-darkred to-dark">
        <PlayerCharacter playerId={playerId} isPlayer={true} className="mt-0" />
      </div>
    </div>
  );
}
