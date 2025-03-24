"use client";

import type { StatTypeEnum } from "@/server/domain/models";
import type { ModEffectCreate } from "@/server/domain/models/effect.model";

import { createModEffect } from "@/server/controllers/effect.controller";
import { getPlayerStats } from "@/server/controllers/player.controller";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import StaffPlayerStats from "./StaffPlayerStats";
import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";
import { clientOrderedStatTypes } from "@/components/players/style";
import StaffPlayerUtils from "@/components/staff/players/StaffPlayerUtils";

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
    onSuccess: () => {
      // alert(`Stat changed successfully!`);
    },
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
    <div className="grid w-full grid-cols-2 gap-4 bg-radial-gradient from-darkred to-dark">
      <PlayerCharacter playerId={playerId}></PlayerCharacter>
      <StaffPlayerUtils
        tabs={[
          {
            label: "Stats",
            node: (
              <StaffPlayerStats
                playerStats={clientOrderedStatTypes.map(
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
          { label: "Inventory", node: <div></div> },
          { label: "Skills", node: <div></div> },
        ]}
        defaultTab="Stats"
      />
    </div>
  );
}
