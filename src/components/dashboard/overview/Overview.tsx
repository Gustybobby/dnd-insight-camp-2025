import type {
  PlayerStatLogFullInfoPlusPlayerCharacter,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";
import type { Item } from "@/server/domain/models";

import React from "react";

import LogTable from "./logs/LogTable";
import PlayerTable from "./players/PlayerTable";

interface OverViewProp {
  players: PlayerWithAllInfo[];
  logs: PlayerStatLogFullInfoPlusPlayerCharacter[];
  items: Item[];
  refetch: () => void;
}

export default function Overview({
  players,
  logs,
  items,
  refetch,
}: OverViewProp) {
  return (
    <div className="flex w-full flex-col items-center space-y-12 p-16">
      <div className="w-full">
        <h1 className="mb-4 text-xl font-bold">Players</h1>
        <PlayerTable players={players} items={items} refetch={refetch} />
      </div>
      <div className="w-full">
        <h1 className="mb-4 text-xl font-bold">Logs</h1>
        <LogTable logs={logs} />
      </div>
    </div>
  );
}
