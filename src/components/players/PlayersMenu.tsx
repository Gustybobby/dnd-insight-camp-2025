"use client";

import { getGlobal } from "@/server/controllers/global.controller";

import { useQuery } from "@tanstack/react-query";

import { CharacterSelectMenu } from "@/components/players/CharacterSelectMenu";
import { PlayerSelectMenu } from "@/components/players/PlayerSelectMenu";

export function PlayersMenu({
  playerId,
  isPlayer,
}: {
  playerId: number;
  isPlayer: boolean;
}) {
  const { data: global } = useQuery({
    queryKey: ["getGlobal"],
    queryFn: async () => await getGlobal(),
    refetchInterval: 5000,
  });

  if (global?.phase === "Choosing") {
    return <CharacterSelectMenu playerId={playerId} isPlayer={isPlayer} />;
  } else if (global?.phase === "Playing") {
    return <PlayerSelectMenu playerId={playerId} isPlayer={isPlayer} />;
  }
}
