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
  refetchPlayer: () => void;
  refetchLogs: () => void;
}

export default function Overview({
  players,
  logs,
  refetchPlayer,
  refetchLogs,
}: OverViewProp) {
  return (
    <div className="flex w-full flex-col items-center space-y-12 p-12">
      <PlayerTable
        players={players}
        refetchPlayers={refetchPlayer}
        refetchLogs={refetchLogs}
      />
      <LogTable logs={logs} />
    </div>
  );
}
