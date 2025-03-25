"use client";

import Overview from "@/components/dashboard/overview/Overview";
import { getAllPlayerStatLogsFullInfo } from "@/server/controllers/log.controller";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";

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

  return <Overview players={players ?? []} />;
}
