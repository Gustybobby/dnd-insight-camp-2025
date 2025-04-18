"use client";

import {
  getActivitySessions,
  getAllActivities,
} from "@/server/controllers/activity.controller";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";

import StaffBattleTab from "@/components/staff/battle/DashboardStaffBattleSessionTab";
import StaffCreateBattleTab from "@/components/staff/createbattle/DashboardStaffCreateBattleTab";
import StaffPlayerRow from "@/components/staff/players/StaffPlayerRow";
import StaffDashboard from "@/components/staff/StaffDashboard";

export default function StaffDashboardPageWrapper() {
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
    refetchInterval: 10000,
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
              activitySessions={
                battleSessions?.filter(
                  (battleSession) => battleSession.isActive,
                ) ?? null
              }
            />
          ),
        },
        {
          label: "Create Battle",
          node: (
            <StaffCreateBattleTab
              activitySessions={battleSessions ?? null}
              players={players}
            />
          ),
        },
      ]}
    />
  );
}
