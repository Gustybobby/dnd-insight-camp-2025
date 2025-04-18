import type {
  ActivitySessionAllInfo,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";

import React from "react";

import StaffBattleSessionPlayerRow from "./StaffBattleSessionPlayerRow";

export interface StaffBattlePlayersInfoProps {
  players: (PlayerWithAllInfo & { order: number })[] | undefined | null;
  activitySession: ActivitySessionAllInfo | undefined | null;
  onSessionPlayerRowClick: (playerId: number) => void;
  selectedPlayerId: number | null;
  setSelectedPlayerId:
    | React.Dispatch<React.SetStateAction<number | null>>
    | React.Dispatch<React.SetStateAction<number>>;
    currentPlayerId: number;
}

export default function StaffBattlePlayersInfo({
  players,
  selectedPlayerId,
  activitySession,
  setSelectedPlayerId,
  onSessionPlayerRowClick,
  currentPlayerId
}: StaffBattlePlayersInfoProps) {
  {
    activitySession?.turns.map((turn) => {
      console.log(turn);
    });
    console.log(activitySession?.currentTurnId);
  }
  return (
    <div className="w-ful flex flex-col">
      <div className="flex w-full justify-center text-black bg-cream py-2 mt-2 border-2 border-oldcream rounded-xl">
        {activitySession?.currentTurnId === null
          ? "Boss's Turn"
          : `Group ${currentPlayerId}'s Turn`}
      </div>
      <div className="flex w-full flex-col gap-y-2 pt-2">
        {players?.map((player, idx) => {
          const isCurrentTurn =
            activitySession?.currentTurnId ===
            activitySession?.turns.find((turn) => turn.playerId === player.id)
              ?.id;
          return (
            <StaffBattleSessionPlayerRow
              key={`staffbattlesessionplayerrow-${player.id}`}
              player={player}
              onClick={() => {
                console.log("Clicking");
                onSessionPlayerRowClick(player.id);
              }}
              selected={selectedPlayerId === player.id}
              isCurrentTurn={isCurrentTurn}
              className={isCurrentTurn ? "ml-[10%]" : ""}
            />
          );
        })}
      </div>
    </div>
  );
}
