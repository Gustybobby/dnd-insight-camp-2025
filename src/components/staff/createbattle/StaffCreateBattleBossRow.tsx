import type { PlayerStat } from "@/server/domain/models";

import React from "react";

import Image from "next/image";

interface StaffCreateBattleBossRowProps {
  maxTurn: number;
}

export default function StaffCreateBattleBossRow({
  maxTurn,
}: StaffCreateBattleBossRowProps) {
  //placeholder
  return (
    <div className="flex w-full justify-center rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-transform hover:scale-[1.02]">
      <div className="flex w-full flex-row items-center gap-x-4">Boss Turn</div>
      <input
        className="size-6 text-center"
        type="number"
        max={maxTurn}
        name={`boss-turn`}
      />
    </div>
  );
}
