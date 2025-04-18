import type { PlayerStat } from "@/server/domain/models";

import React from "react";

import { cn } from "@/components/utils";
import Image from "next/image";

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
        <p className="font-notosansthai">{name}</p>
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
        className="h-6 w-8 text-center"
        max={maxTurn}
        name={`player-${id}-turn`}
        disabled={inBattle}
      />
    </div>
  );
}
