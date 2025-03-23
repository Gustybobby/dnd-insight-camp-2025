"use client";

import { getAllPlayers } from "@/server/controllers/player.controller";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import CreatePlayerForm from "@/components/dashboard/create-player/CreatePlayerForm";

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
