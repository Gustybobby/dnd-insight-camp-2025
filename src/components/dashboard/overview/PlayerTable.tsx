import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import { ALL_STAT_TYPES } from "@/shared/stat";

import React from "react";

import PlayerRow from "./PlayerRow";

interface PlayerTableProp {
  players: PlayerWithAllInfo[];
}

export default function PlayerTable({ players }: PlayerTableProp) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="border text-left">
          <th>Character</th>
          <th>Name</th>
          <th className="flex">
            {ALL_STAT_TYPES.map((type, index) => (
              <div className="flex-1 text-center" key={index}>
                {type}
              </div>
            ))}
          </th>
          <th className="w-56">Items</th>
          <th className="w-56">Equipment</th>
          <th className="w-56">Skill</th>
          <th className="w-56">Effect</th>
          <th>Reset</th>
        </tr>
      </thead>

      <tbody>
        {players.map((player) => (
          <PlayerRow player={player} key={player.id}></PlayerRow>
        ))}
      </tbody>
    </table>
  );
}
