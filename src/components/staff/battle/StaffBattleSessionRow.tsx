import type { PlayerWithAllInfo } from "@/server/domain/aggregates";
import type { ActivitySession } from "@/server/domain/models";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { mapNumToAlphabet } from "@/components/utils";

export default function StaffBattleSessionRow({
  activitySession,
  currentPlayer,
  isBossTurn,
}: {
  activitySession: ActivitySession;
  currentPlayer: PlayerWithAllInfo | null | undefined;
  isBossTurn: boolean;
}) {
  //placeholder
  return (
    <Link
      href={`/staff/battlesessions/${activitySession.id}`}
      className="flex w-full flex-row items-center justify-between rounded-md border-2 border-black bg-brown-gradient p-4 shadow transition-transform hover:scale-[1.02]"
    >
      <div className="flex flex-row gap-x-2">
        <div>Session {activitySession.id}</div>
        <div>{activitySession.battleLogs.at(-1)}</div>
      </div>
      {currentPlayer && (
        <div className="grid w-[400px] grid-cols-4 place-items-center gap-x-4">
          <p>Current Turn</p>
          <p>
            Group {currentPlayer?.id ? mapNumToAlphabet(currentPlayer?.id) : ""}
          </p>
          <p className="overflow-elipsis truncate">{currentPlayer?.name}</p>
          <div>
            <Image
              src={currentPlayer?.character.image}
              width={100}
              height={100}
              className="h-12 w-auto"
              alt={currentPlayer?.character.name}
            />
          </div>
        </div>
      )}
      {isBossTurn && <div>Boss Turn</div>}
    </Link>
  );
}
