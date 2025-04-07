import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import { ALL_STAT_TYPES } from "@/shared/stat";

import React from "react";

import PlayerRow from "./PlayerRow";

interface PlayerTableProp {
  players: PlayerWithAllInfo[];
  refetch: () => void;
}

export default function PlayerTable({ players, refetch }: PlayerTableProp) {
  return (
    <div className="w-full border">
      {/* Table head */}
      <div className="grid grid-cols-9 border font-bold">
        <p className="col-span-2">Character</p>
        <p className="col-span-2">Name</p>
        <div className="col-span-4 flex">
          {ALL_STAT_TYPES.map((type, index) => (
            <div className="flex-1 text-center" key={index}>
              {type}
            </div>
          ))}
        </div>
        <div className="text-center">Reset</div>
      </div>

      <div>
        {players.map((player) => (
          <PlayerRow
            player={player}
            key={player.id}
            refetch={refetch}
          ></PlayerRow>
        ))}
      </div>
    </div>
  );
}
