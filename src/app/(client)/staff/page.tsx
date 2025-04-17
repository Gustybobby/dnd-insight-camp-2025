"use client";

import { getAllPlayersInfo } from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import StaffBattleTab from "@/components/staff/battleSession/StaffBattleTab";
import StaffPlayerRow from "@/components/staff/players/StaffPlayerRow";
import StaffDashboard from "@/components/staff/StaffDashboard";
import { getSession } from "next-auth/react";
import {
  getActivitySessions,
  getAllActivities,
} from "@/server/controllers/activity.controller";

export default function Home() {
  // const {} = useQuery({
  //   queryKey: ["getSession"],
  //   queryFn: async () =>
  //     await getSession().then((session) => {
  //       if(!session) {
  //         redirect("/");
  //       }
  //       if (session?.user?.staffId == null) {
  //         redirect("/");
  //       }
  //     }),
  // });

  const { data: players } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayersInfo(),
    refetchInterval: 5000,
  });
  const { data: activities } = useQuery({
    queryKey: ["getAllActivities"],
    queryFn: async () => await getAllActivities(),
  });
  const { data: battleSessions } = useQuery({
    queryKey: ["getActivitySessions"],
    queryFn: async () =>
      await getActivitySessions({
        activityId:
          activities?.find(
            (activity) => activity.name.toLowerCase() === "battle",
          )?.id ?? 1,
      }),
    refetchInterval: 2000,
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
          node: (
            <StaffBattleTab
              players={players}
              activitySessions={battleSessions ?? null}
            />
          ),
        },
      ]}
    />
  );
}
