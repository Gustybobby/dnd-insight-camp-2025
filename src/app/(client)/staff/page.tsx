"use client";

import StaffBattleTab from "@/components/staff/battle/StaffBattleTab";
import StaffPlayerRow from "@/components/staff/players/StaffPlayerRow";
import StaffDashboard from "@/components/staff/StaffDashboard";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const {} = useQuery({
    queryKey: ["getSession"],
    queryFn: async () =>
      await getSession().then((session) => {
        if (session?.user?.staffId == null) {
          redirect("/");
        }
      }),
  });

  const { data: players } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayersInfo(),
    refetchInterval: 5000,
  });

  return (
    <StaffDashboard
      defaultTab="Players"
      tabs={[
        {
          label: "Players",
          node: (
            <div className="flex w-full flex-col gap-y-1 p-2">
              {players?.map((player) => (
                <StaffPlayerRow
                  key={player.id}
                  id={player.id}
                  name={player.name}
                  player={player.character}
                  playerStats={player.stats}
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
