"use client";

import { getGlobal } from "@/server/controllers/global.controller";
import { getAllItems } from "@/server/controllers/items.controller";
import { getAllPlayerStatLogsFullInfo } from "@/server/controllers/log.controller";

import { useQuery } from "@tanstack/react-query";

import { fetchAllPlayersInfo } from "@/bff/api/players.api";
import Overview from "@/components/dashboard/overview/Overview";
import { getAllSkills } from "@/server/controllers/skill.controller";

export default function DashboardOverviewWrapper() {
  const { data, refetch } = useQuery({
    queryKey: ["getPlayerAllStats"],
    queryFn: async () => {
      const [players, logs, items, global, skills] = await Promise.all([
        fetchAllPlayersInfo(),
        getAllPlayerStatLogsFullInfo(),
        getAllItems(),
        getGlobal(),
        getAllSkills()
      ]);
      return { players, logs, items, global };
    },
    refetchInterval: 10 * 1000,
  });

  return (
    <Overview
      players={data?.players ?? []}
      logs={data?.logs ?? []}
      items={data?.items ?? []}
      global={data?.global ?? null}
      refetch={refetch}
    />
  );
}
