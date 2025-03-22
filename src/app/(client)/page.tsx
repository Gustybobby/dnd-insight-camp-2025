"use client";

import { getAllPlayers } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isRefetching } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: getAllPlayers,
    refetchInterval: 5000,
  });

  return (
    <div>Test Data {isRefetching ? "refetching" : JSON.stringify(data)}</div>
  );
}
