import React from "react";

interface StaffCreateBattleBossRowProps {
  maxTurn: number;
}

export default function StaffCreateBattleBossRow({
  maxTurn,
}: StaffCreateBattleBossRowProps) {
  //placeholder
  return (
    <div className="flex w-full justify-center rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-transform">
      <div className="flex w-full flex-row items-center gap-x-4">Boss Turn</div>
      <input className="h-6 w-8 text-center" max={maxTurn} name={`boss-turn`} />
    </div>
  );
}
