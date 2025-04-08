import type {
  PlayerStatLogFullInfoPlusPlayerCharacter,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";

import React from "react";

import LogTable from "./logs/LogTable";
import PlayerTable from "./players/PlayerTable";
import { Item } from "@/server/domain/models";

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
      <PlayerTable players={players} items={items} refetch={refetch} />
      <LogTable logs={logs} />
    </div>
  );
}
