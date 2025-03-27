"use client";

import { getAllPlayerStatLogsFullInfo } from "@/server/controllers/log.controller";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";

import Overview from "@/components/dashboard/overview/Overview";

export default function OverviewDashboard() {
  const { data: players, refetch: refetchPlayers } = useQuery({
    queryKey: ["getPlayerAllStats"],
    queryFn: async () => await getAllPlayersInfo(),
    refetchInterval: 5000,
  });

  const { data: logs, refetch: refetchLogs } = useQuery({
    queryKey: ["getAllPlayerStatLogsFullInfo"],
    queryFn: async () => await getAllPlayerStatLogsFullInfo(),
    refetchInterval: 5000,
  });

  console.log(players);
  console.log(logs);

  return (
    <Overview
      players={players ?? []}
      logs={logs ?? []}
      refetchPlayer={refetchPlayers}
      refetchLogs={refetchLogs}
    />
  );
}
