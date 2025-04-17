import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import React from "react";

import StaffBattleSessionPlayerRow from "./StaffBattleSessionPlayerRow";

export interface StaffBattlePlayersInfoProps {
  players: (PlayerWithAllInfo & { order: number })[] | undefined | null;
  selectedPlayerId: number | null;
  setSelectedPlayerId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function StaffBattlePlayersInfo({
  players,
  selectedPlayerId,
  setSelectedPlayerId,
}: StaffBattlePlayersInfoProps) {
  return (
    <div className="flex w-full px-4">
      <div className="flex w-full flex-col gap-y-2 pt-2">
        {players?.map((player) => (
          <StaffBattleSessionPlayerRow
            key={`staffbattlesessionplayerrow-${player.id}`}
            player={player}
            onClick={() => setSelectedPlayerId(player.id)}
            selected={selectedPlayerId === player.id}
          />
        ))}
      </div>
    </div>
  );
}
