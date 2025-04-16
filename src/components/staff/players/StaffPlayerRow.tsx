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
}

function StaffPlayerRow({ id, name, player, playerStats }: StaffPlayerRow) {
  return (
    <Link
      className="bg-brown-gradient flex w-full flex-row items-center justify-between rounded-md border-2 border-black p-4 shadow transition-transform hover:scale-[1.02]"
      href={`staff/players/${id}`}
    >
      <div className="flex flex-row gap-x-4">
        <p>Group {id}</p>
        <p className="font-[family-name:var(--noto-sans-thai)]">
          {player.name}
        </p>
      </div>
      <div>
        {playerStats?.map((stat) => (
          <div
            key={`${player.name}-${stat.type}`}
            className="flex flex-row gap-x-2"
          >
            <p>{stat.type}</p>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
      <Image
        src={player.image}
        width={100}
        height={100}
        className="h-12 w-auto"
        alt={player.name}
      />
    </Link>
  );
}

export default StaffPlayerRow;
