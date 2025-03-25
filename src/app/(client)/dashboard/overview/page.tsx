"use client";

import Overview from "@/components/dashboard/overview/Overview";
import { getAllPlayersInfo } from "@/server/controllers/player.controller";
import { PlayerWithAllInfo } from "@/server/domain/aggregates";
import { useQuery } from "@tanstack/react-query";

export default function OverviewDashboard() {
  const { data: players } = useQuery({
    queryKey: ["getPlayerAllStats"],
    queryFn: async () => await getAllPlayersInfo(),
  });

  console.log(players);

  return <Overview players={players ?? []} />;
}
