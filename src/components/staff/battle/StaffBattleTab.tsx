import { PlayerWithAllInfo } from "@/server/domain/aggregates";
import React from "react";
import StaffBattleRow from "./StaffBattleRow";

interface StaffBattleTabProps {
  players?: PlayerWithAllInfo[] | null;
}
function StaffBattleTab({ players }: StaffBattleTabProps) {
  return (
    <div className="w-full flex flex-col gap-y-1 p-2">
      <div className="w-full flex flex-row justify-between">
        <p className="text-center text-2xl font-bold w-[250px]">Name</p>
        <p className="text-center text-2xl font-bold">Status</p>
        <p className="text-center text-2xl font-bold">Select</p>
        <p className="text-center text-2xl font-bold">Turn</p>

      </div>
      {players?.map((player) => (
        <StaffBattleRow
          key={player.id}
          id={player.id}
          name={player.name}
          player={player.character}
          inBattle={false}
        />
      ))}
    </div>
  );
}

export default StaffBattleTab;
