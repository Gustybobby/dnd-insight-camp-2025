import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import React from "react";

import { cn, mapNumToAlphabet } from "@/components/utils";

export interface StaffBattleSessionPlayerRowProps {
  player: PlayerWithAllInfo & { order: number };
  selected: boolean;
  onClick: () => void;
  isCurrentTurn: boolean;
  className?: string;
}

export default function StaffBattleSessionPlayerRow({
  player,
  onClick,
  selected,
  isCurrentTurn,
  className,
}: StaffBattleSessionPlayerRowProps) {
  //placeholder
  return (
    <div
      onClick={() => onClick()}
      className={cn(
        "flex w-[90%] flex-row items-center justify-between rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-all",
        selected ? "border-red border-4" : "",
        className ?? "",
      )}
    >
      <div className="flex w-[200px] flex-row items-center gap-x-4">
        <p>Turn {player.order}</p>
        <p>Group {mapNumToAlphabet(player.id)}</p>
        <p className="font-notosansthai">{player.name}</p>
      </div>
      <div>{isCurrentTurn ? "Current Turn" : ""}</div>
    </div>
  );
}
