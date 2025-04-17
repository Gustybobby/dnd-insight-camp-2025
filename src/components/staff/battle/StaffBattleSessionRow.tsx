import type { PlayerWithAllInfo } from "@/server/domain/aggregates";
import type { ActivitySession } from "@/server/domain/models";

import React from "react";

import Image from "next/image";
import Link from "next/link";

export default function StaffBattleSessionRow({
  activitySession,
  currentPlayer,
}: {
  activitySession: ActivitySession;
  currentPlayer: PlayerWithAllInfo | null;
}) {
  //placeholder
  return (
    <Link href = {`/staff/battlesessions/${activitySession.id}`} className="flex w-full flex-row items-center justify-between rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-transform hover:scale-[1.02]">
      <div>
        <div>Session {activitySession.id}</div>
        <div>{activitySession.battleLogs.at(-1)}</div>
      </div>
      {currentPlayer && (
        <div className="flex w-[260px] flex-row items-center gap-x-4">
          <p>Current Turn</p>
          <p>Group {currentPlayer?.characterId}</p>
          <p className="font-[family-name:var(--noto-sans-thai)] truncate overflow-elipsis">
            {currentPlayer?.name}
          </p>
          <Image
            src={currentPlayer?.character.image}
            width={100}
            height={100}
            className="h-12 w-auto"
            alt={currentPlayer?.character.name}
          />
        </div>
      )}
    </Link>
  );
}
