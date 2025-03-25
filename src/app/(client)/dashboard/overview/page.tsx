"use client";

import {
  getAllPlayers,
  getAllPlayersInfo,
  getPlayerStats,
} from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";

export default function OverviewDashboard() {
  const { data: players } = useQuery({
    queryKey: ["getPlayerAllStats"],
    queryFn: async () => await getAllPlayersInfo(),
  });

  console.log(players);
  return <div>d</div>;
}
