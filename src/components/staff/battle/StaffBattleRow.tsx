import type { PlayerStat } from "@/server/domain/models";

import React from "react";

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

export default function StaffBattleRow({
  id,
  name,
  character,
  playerStats,
  inBattle,
  maxTurn,
}: StaffPlayerRow) {
  //placeholder
  console.log(playerStats);
  return (
    <div className="bg-brown-gradient flex w-full flex-row items-center justify-between rounded-md border-2 border-black p-4 shadow transition-transform hover:scale-[1.02]">
      <div className="flex w-[200px] flex-row items-center gap-x-4">
        <p>Group {id}</p>
        <p className="font-[family-name:var(--noto-sans-thai)]">
          {name}
        </p>
        <Image
          src={character.image}
          width={100}
          height={100}
          className="h-12 w-auto"
          alt={character.name}
        />
      </div>
      {inBattle ? "In Battle" : "Not in Battle"}
      <input className="size-6" type="checkbox" name={`${id}-check`} />
      <input className="size-6 text-center" type="number" max={maxTurn}></input>
    </div>
  );
}
