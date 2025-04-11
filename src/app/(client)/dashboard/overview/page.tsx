"use client";

import { getAllItems } from "@/server/controllers/items.controller";
import { getAllPlayerStatLogsFullInfo } from "@/server/controllers/log.controller";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";

import Overview from "@/components/dashboard/overview/Overview";

export default function OverviewDashboard() {
  const { data, refetch } = useQuery({
    queryKey: ["getPlayerAllStats"],
    queryFn: async () => {
      const [players, logs, items] = await Promise.all([
        getAllPlayersInfo(),
        getAllPlayerStatLogsFullInfo(),
        getAllItems(),
      ]);
      return { players, logs, items };
    },
    refetchInterval: 10000,
  });

  return (
    <Overview
      players={data?.players ?? []}
      logs={data?.logs ?? []}
      items={data?.items ?? []}
      refetch={refetch}
    />
  );
}
