import type { PlayerStat } from "@/server/domain/models";

import React from "react";

import Image from "next/image";
import { cn } from "@/components/utils";

export interface StaffPlayerRow {
  id: number;
  name: string;
  character: {
    image: string;
    name: string;
  };
  playerStats?: PlayerStat[];
  inBattle: boolean;
  maxTurn: number;
}

export default function StaffCreateBattlePlayerRow({
  id,
  name,
  character,
  inBattle,
  maxTurn,
}: StaffPlayerRow) {
  //placeholder
  return (
    <div
      className={cn(
        "grid w-full grid-cols-4 place-items-center justify-between rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-transform hover:scale-[1.02]",
        inBattle ? "opacity-50" : "",
      )}
    >
      <div className="flex w-full flex-row items-center gap-x-4">
        <p>Group {id}</p>
        <p className="font-[family-name:var(--noto-sans-thai)]">{name}</p>
        <Image
          src={character.image}
          width={100}
          height={100}
          className="h-12 w-auto"
          alt={character.name}
        />
      </div>
      {inBattle ? "In Battle" : "Not In Battle"}
      <input
        className="size-6"
        type="checkbox"
        name={`player-${id}-check`}
        disabled={inBattle}
      />
      <input
        className="size-6 text-center"
        type="number"
        max={maxTurn}
        name={`player-${id}-turn`}
        disabled={inBattle}
      />
    </div>
  );
}
