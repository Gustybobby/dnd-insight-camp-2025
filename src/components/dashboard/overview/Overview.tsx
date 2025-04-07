import type {
  PlayerStatLogFullInfoPlusPlayerCharacter,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";

import React from "react";

import LogTable from "./logs/LogTable";
import PlayerTable from "./players/PlayerTable";

interface OverViewProp {
  players: PlayerWithAllInfo[];
  logs: PlayerStatLogFullInfoPlusPlayerCharacter[];
  refetch: () => void;
}

export default function Overview({ players, logs, refetch }: OverViewProp) {
  return (
    <div className="flex w-full flex-col items-center space-y-12 p-12">
      <PlayerTable players={players} refetch={refetch} />
      <LogTable logs={logs} />
    </div>
  );
}
