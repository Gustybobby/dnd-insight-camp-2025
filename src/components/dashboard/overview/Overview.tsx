import { PlayerWithAllInfo } from "@/server/domain/aggregates";
import React from "react";
import PlayerTable from "./PlayerTable";

interface OverViewProp {
  players: PlayerWithAllInfo[];
}

export default function Overview({ players }: OverViewProp) {
  return (
    <div className="flex w-full flex-col items-center space-y-4 p-4">
      <PlayerTable players={players} />
    </div>
  );
}
