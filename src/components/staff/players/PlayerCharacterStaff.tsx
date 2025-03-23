"use client";

import {
  getPlayerCharacter,
  getPlayerStats,
} from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { PlayerCharacter } from "@/components/players/PlayerCharacter";
import StaffPlayerUtils from "@/components/staff/players/StaffPlayerUtils";
import { PlayerStats } from "@/components/players/tabs/PlayerStats";
import { clientOrderedStatTypes } from "@/components/players/style";
import StaffPlayerStats from "./StaffPlayerStats";

interface StatChangeFormData {
  name: string;
  characterId: number;
  str: number;
  dex: number;
  chr: number;
  int: number;
  hp: number;  
}

export function PlayerCharacterStaff({ playerId }: { playerId: number }) {
  const router = useRouter();

  const { data: character } = useQuery({
    queryKey: ["getPlayerCharacter", playerId],
    queryFn: async () => await getPlayerCharacter({ playerId }),
  });

  const { data: playerStats } = useQuery({
    queryKey: ["getPlayerStats", playerId],
    queryFn: async () => await getPlayerStats({ playerId }),
    refetchInterval: 5000,
  });

  if (character === null) {
    router.replace("/players");
    return;
  }

  return (
    <div className="bg-radial-gradient from-darkred to-dark grid w-full grid-cols-2 gap-4">
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
