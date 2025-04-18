import type { PlayerStat } from "@/server/domain/models";

import { ALL_STAT_TYPES } from "@/shared/stat";

import React from "react";

import { STAT_STYLE_MAP } from "@/components/players/style";
import Image from "next/image";
import Link from "next/link";

export interface StaffPlayerRow {
  id: number;
  name: string;
  player: {
    image: string;
    name: string;
  };
  playerStats?: PlayerStat[];
}

export default function StaffPlayerRow({
  id,
  name,
  player,
  playerStats,
}: StaffPlayerRow) {
  const sortedStats = playerStats?.sort((a, b) => {
    const indexA = ALL_STAT_TYPES.indexOf(
      a.type as (typeof ALL_STAT_TYPES)[number],
    );
    const indexB = ALL_STAT_TYPES.indexOf(
      b.type as (typeof ALL_STAT_TYPES)[number],
    );
    return indexA - indexB;
  });
  return (
    <Link
      className="flex w-full flex-row items-center justify-between rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-transform hover:scale-[1.01]"
      href={`staff/players/${id}`}
    >
      <div className="flex flex-row items-center gap-x-4 text-sm font-light">
        <p className="w-[50px]">Group {id}</p>
        <p className="w-[100px] truncate overflow-ellipsis font-notosansthai text-sm">
          {name}
        </p>
      </div>
      <div className="grid w-full grid-cols-5 gap-x-4">
        {sortedStats?.map((stat) => (
          <div
            key={`${player.name}-${stat.type}`}
            className={`flex flex-row justify-center gap-x-2 rounded-3xl px-8 text-center font-bold ${STAT_STYLE_MAP[stat.type].bgColor}`}
          >
            <p>{stat.type}</p>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="flex w-[80px] justify-center">
        <Image
          src={player.image}
          width={100}
          height={100}
          className="h-12 w-auto"
          alt={player.name}
        />
      </div>
    </Link>
  );
}
