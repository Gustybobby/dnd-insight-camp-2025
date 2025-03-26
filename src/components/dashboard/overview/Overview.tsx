import type {
  PlayerStatLogFullInfoPlusPlayerCharacter,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";

import React from "react";

import LogTable from "./LogTable";
import PlayerTable from "./PlayerTable";

interface OverViewProp {
  players: PlayerWithAllInfo[];
  logs: PlayerStatLogFullInfoPlusPlayerCharacter[];
}

export default function Overview({ players, logs }: OverViewProp) {
  return (
    <div className="flex w-full flex-col items-center space-y-12 p-12">
      <PlayerTable players={players} />
      <LogTable logs={logs} />
    </div>
  );
}
