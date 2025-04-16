import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import React from "react";

import StaffBattleRow from "./StaffBattleRow";

interface StaffBattleTabProps {
  players?: PlayerWithAllInfo[] | null;
}
function StaffBattleTab({ players }: StaffBattleTabProps) {
  return (
    <div className="flex w-full flex-col gap-y-1 p-2">
      <div className="flex w-full flex-row justify-between">
        <p className="w-[250px] text-center text-2xl font-bold">Name</p>
        <p className="text-center text-2xl font-bold">Status</p>
        <p className="text-center text-2xl font-bold">Select</p>
        <p className="text-center text-2xl font-bold">Turn</p>
      </div>
      {players?.map((player) => (
        <StaffBattleRow
          key={player.id}
          id={player.id}
          name={player.name}
          character={player.character}
          inBattle={false}
          maxTurn={20}
        />
      ))}
      <div>
        Add monster
      </div>
    </div>
  );
}

export default StaffBattleTab;
