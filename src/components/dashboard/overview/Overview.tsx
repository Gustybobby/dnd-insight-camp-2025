import {
  PlayerStatLogFullInfoPlusPlayerCharacter,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";
import React from "react";
import PlayerTable from "./PlayerTable";
import LogTable from "./LogTable";

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
