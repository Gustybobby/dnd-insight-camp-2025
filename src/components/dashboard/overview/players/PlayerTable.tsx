import type { PlayerWithAllInfo } from "@/server/domain/aggregates";
import type { Item, Skill } from "@/server/domain/models";

import { ALL_STAT_TYPES } from "@/shared/stat";

import React from "react";

import PlayerRow from "./PlayerRow";

interface PlayerTableProp {
  players: PlayerWithAllInfo[];
  items: Item[];
  refetch: () => void;
}

export default function PlayerTable({
  players,
  items,
  refetch,
}: PlayerTableProp) {
  return (
    <div className="w-full">
      {/* Table head */}
      <div className="grid grid-cols-10 bg-seafoam px-4 font-bold">
        <p className="col-span-2">Character</p>
        <p className="col-span-2">Name</p>
        <div className="col-span-4 flex">
          {ALL_STAT_TYPES.map((type, index) => (
            <div className="flex-1 text-center" key={index}>
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Table body */}
      <div>
        {players.map((player) => (
          <PlayerRow
            player={player}
            items={items}
            key={player.id}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}
