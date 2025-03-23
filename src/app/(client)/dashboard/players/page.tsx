"use client";

import CreatePlayerForm from "@/components/dashboard/create-player/CreatePlayerForm";
import { getAllPlayers } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";
import React from "react";
export default function PlayerDashboard() {
  const { data: players, isRefetching: isPlayersRefetching } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayers(),
    refetchInterval: 5000,
  });

  return (
    <div>
      <div>
        Test Players:{" "}
        {isPlayersRefetching ? "refetching" : JSON.stringify(players)}
      </div>
      <CreatePlayerForm />
    </div>
  );
}
