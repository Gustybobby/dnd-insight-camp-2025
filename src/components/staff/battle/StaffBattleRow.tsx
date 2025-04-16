import Link from "next/link";
import React from "react";
import Image from "next/image";
import { PlayerStat } from "@/server/domain/models";

export interface StaffPlayerRow {
  id: number;
  name: string;
  player: {
    image: string;
    name: string;
  };
  playerStats?: PlayerStat[];
  inBattle: boolean;
}

export default function StaffBattleRow({
  id,
  name,
  player,
  playerStats,
  inBattle,
}: StaffPlayerRow) {
  return (
    <div className="bg-brown-gradient flex w-full flex-row items-center justify-between rounded-md border-2 border-black p-4 shadow transition-transform hover:scale-[1.02]">
      <div className="flex flex-row gap-x-4 w-[200px] items-center">
        <p>Group {id}</p>
        <p className="font-[family-name:var(--noto-sans-thai)]">
          {player.name}
        </p>
        <Image
          src={player.image}
          width={100}
          height={100}
          className="h-12 w-auto"
          alt={player.name}
        />
      </div>
      {inBattle ? "In Battle" : "Not in Battle"}
      <input className="size-6" type="checkbox" name={`${id}-check`} />
      <input className="size-6" type="number"></input>
    </div>
  );
}
