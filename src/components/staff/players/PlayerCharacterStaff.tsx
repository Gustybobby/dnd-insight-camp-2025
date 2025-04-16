"use client";

import type { Item, StatTypeEnum } from "@/server/domain/models";
import type { ModEffectCreate } from "@/server/domain/models/effect.model";

import { ALL_STAT_TYPES, ORDERED_STAT_TYPES } from "@/shared/stat";

import { createModEffect } from "@/server/controllers/effect.controller";
import {
  getPlayerItems,
  getPlayerStats,
} from "@/server/controllers/player.controller";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { StaffPlayerStats } from "./StaffPlayerStats";
import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";
import { StaffPlayerUtils } from "@/components/staff/players/StaffPlayerUtils";
import Link from "next/link";
import { StaffPlayerItems } from "./StaffPlayerItem";
import { getAllItems } from "@/server/controllers/items.controller";

export function PlayerCharacterStaff({ playerId }: { playerId: number }) {
  const router = useRouter();

  const { data: playerStats, refetch: refetchPlayerStats } = useQuery({
    queryKey: ["getPlayerStats", playerId],
    queryFn: async () => await getPlayerStats({ playerId }),
    refetchInterval: 5000,
  });

  const mutation = useMutation({
    mutationFn: (modEffectCreate: ModEffectCreate) =>
      createModEffect({ data: { ...modEffectCreate }, playerIds: [+playerId] }),
    onSuccess: () => {},
  });

  const { data: items } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: async () => await getAllItems(),
  });
  if (playerStats === null) {
    router.replace("/staff/players");
    return;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const statChange = Object.fromEntries(
      formData.entries().filter(([, value]) => +value !== 0),
    );
    const mutationPromises = Object.entries(statChange).map(([key, value]) => {
      return mutation.mutateAsync({
        stat: key as StatTypeEnum,
        value: +value,
        itemId: null,
      });
    });
    Promise.all(mutationPromises)
      .then(() => {
        void refetchPlayerStats();
      })
      .catch((e) => {
        alert(`Error changing stat: ${e}`);
      });
    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col">
      <div className="px-4">
        <div className="flex w-full flex-row items-center justify-between rounded-md border-2 border-oldcream bg-cream px-4 py-2 text-xl">
          <Link href={"/staff"}>Back</Link>
          <h1>Player</h1>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4 bg-radial-gradient from-darkred to-dark overflow-y-auto">
        <PlayerCharacter playerId={playerId} isPlayer={true} className="mt-0" />
        <StaffPlayerUtils
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
                  onSubmit={onSubmit}
                />
              ),
            },
            {
              label: "Item",
              node: (
                <StaffPlayerItems items={items ?? null} onSubmit={() => {}}/>
              ),
            },
            { label: "Skills", node: <div></div> },
          ]}
          defaultTab="Stats"
        />
      </div>
    </div>
  );
}
