"use client";

import StaffBattleTab from "@/components/staff/battle/StaffBattleTab";
import StaffPlayerRow from "@/components/staff/players/StaffPlayerRow";
import StaffDashboard from "@/components/staff/StaffDashboard";
import { getAllPlayers, getAllPlayersInfo } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: players } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayersInfo(),
    refetchInterval: 5000,
  });

  console.log(players);

  return (
    <StaffDashboard
      defaultTab="Players"
      tabs={[
        {
          label: "Players",
          node: (
            <div className="flex flex-col gap-y-1 p-2 w-full">
              {players?.map((player) => (
                <StaffPlayerRow
                  key={player.id}
                  id={player.id}
                  name={player.name}
                  player={player.character}
                />
              ))}
            </div>
          ),
        },
        {
          label: "Battle",
          node: <StaffBattleTab players={players} />,
        },
      ]}
    />
  );
}
