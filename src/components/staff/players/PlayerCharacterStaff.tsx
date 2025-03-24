"use client";

import type { StatTypeEnum } from "@/server/domain/models";
import type { ModEffectCreate } from "@/server/domain/models/effect.model";

import { ORDERED_STAT_TYPES } from "@/shared/stat";

import { createModEffect } from "@/server/controllers/effect.controller";
import { getPlayerStats } from "@/server/controllers/player.controller";

import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import { StaffPlayerStats } from "./StaffPlayerStats";
import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";
import { StaffPlayerUtils } from "@/components/staff/players/StaffPlayerUtils";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const backPatterns: { pathRegex: RegExp; redirectTo: string }[] = [
  { pathRegex: /^\/players\/.*$/, redirectTo: "/players" },
  { pathRegex: /^\/players/, redirectTo: "/" },
];

export function PlayerCharacterStaff({ playerId }: { playerId: number }) {
  const router = useRouter();
  const pathname = usePathname();

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

  if (playerStats === null) {
    router.replace("/staff/players");
    return;
  }
  const [isChanging, setIsChanging] = useState(false);

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
    setIsChanging(true);
    Promise.all(mutationPromises)
      .then(() => {
        void refetchPlayerStats();
      })
      .catch((e) => {
        alert(`Error changing stat: ${e}`);
      });
    e.currentTarget.reset();
    setIsChanging(false);
  };
  return (
    <div className="flex flex-col">
      <div className="px-4">
        <div className="flex w-full flex-row items-center justify-between rounded-md border-2 border-oldcream bg-cream px-4 py-2 text-xl">
          <Link href={"/staff"}>Back</Link>
          <h1>Player</h1>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4 bg-radial-gradient from-darkred to-dark">
        <PlayerCharacter playerId={playerId} isPlayer={true} className="mt-0" />
        <StaffPlayerUtils
          tabs={[
            {
              label: "Stats",
              node: (
                <StaffPlayerStats
                  playerStats={ORDERED_STAT_TYPES.map(
                    (type) =>
                      playerStats?.find((stat) => stat.type === type) ?? {
                        type,
                        value: 0,
                        playerId: 0,
                      },
                  )}
                  onSubmit={onSubmit}
                  isChanging={isChanging}
                />
              ),
            },
            { label: "Inventory", node: <div></div> },
            { label: "Skills", node: <div></div> },
          ]}
          defaultTab="Stats"
        />
      </div>
    </div>
  );
}
