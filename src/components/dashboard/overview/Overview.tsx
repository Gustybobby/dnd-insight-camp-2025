import type {
  PlayerStatLogFullInfoPlusPlayerCharacter,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";
import type { GlobalType, Item } from "@/server/domain/models";

import React from "react";

import ItemTable from "./items/ItemTable";
import LogTable from "./logs/LogTable";
import PhaseSelect from "./phase/PhaseSelect";
import PlayerTable from "./players/PlayerTable";

interface OverViewProp {
  players: PlayerWithAllInfo[];
  logs: PlayerStatLogFullInfoPlusPlayerCharacter[];
  items: Item[];
  global: GlobalType | null;
  refetch: () => void;
}

export default function Overview({
  players,
  logs,
  items,
  global,
  refetch,
}: OverViewProp) {
  return (
    <div className="flex w-full flex-col items-center space-y-12 p-16">
      <div className="flex w-full space-x-4">
        <h1 className="mb-4 text-xl font-bold">Game Phase</h1>
        <PhaseSelect phase={global?.phase ?? "Non-Active"} refetch={refetch} />
      </div>
      <div className="w-full">
        <h1 className="mb-4 text-xl font-bold">Players</h1>
        <PlayerTable players={players} items={items} refetch={refetch} />
      </div>
      <div className="w-full">
        <h1 className="mb-4 text-xl font-bold">Items</h1>
        <ItemTable items={items} refetch={refetch} />
      </div>
      <div className="w-full">
        <h1 className="mb-4 text-xl font-bold">Logs</h1>
        <LogTable logs={logs} />
      </div>
    </div>
  );
}
