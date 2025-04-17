import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import React from "react";

import { cn } from "@/components/utils";

export interface StaffBattleSessionPlayerRowProps {
  player: PlayerWithAllInfo & { order: number };
  selected: boolean;
  onClick: () => void;
}

export default function StaffBattleSessionPlayerRow({
  player,
  onClick,
  selected,
}: StaffBattleSessionPlayerRowProps) {
  //placeholder
  return (
    <div
      onClick={() => onClick}
      className={cn(
        "flex w-full flex-row items-center justify-between rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-transform hover:scale-[1.02]",
        selected ? "border-4 border-red" : "",
      )}
    >
      <div className="flex w-[200px] flex-row items-center gap-x-4">
        <p>{player.order}</p>
        <p>Group {player.id}</p>
        <p className="font-[family-name:var(--noto-sans-thai)]">
          {player.name}
        </p>
      </div>
    </div>
  );
}
