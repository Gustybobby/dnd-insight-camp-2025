"use client";

import { getAllPlayerStatLogsFullInfo } from "@/server/controllers/log.controller";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";

import Overview from "@/components/dashboard/overview/Overview";

export default function OverviewDashboard() {
  const { data: players } = useQuery({
    queryKey: ["getPlayerAllStats"],
    queryFn: async () => await getAllPlayersInfo(),
  });

  const { data: logs } = useQuery({
    queryKey: ["getAllPlayerStatLogsFullInfo"],
    queryFn: async () => await getAllPlayerStatLogsFullInfo(),
  });

  console.log(players);
  console.log(logs);

  return <Overview players={players ?? []} logs={logs ?? []} />;
}
