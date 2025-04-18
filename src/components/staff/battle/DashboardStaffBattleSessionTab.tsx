import type {
  ActivitySessionAllInfo,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";

import React from "react";

import StaffBattleSessionRow from "./StaffBattleSessionRow";

interface StaffBattleTabProps {
  players?: PlayerWithAllInfo[] | null;
  activitySessions: ActivitySessionAllInfo[] | null;
}
export default function StaffBattleTab({
  players,
  activitySessions,
}: StaffBattleTabProps) {
  return (
    <div className="flex w-full flex-col gap-y-1 p-2">
      <div className="flex w-full flex-col gap-y-1 text-center">
        <div className="text-center text-2xl font-bold">Battle Sessions</div>
        <div className="flex w-full flex-col justify-between gap-y-1">
          {activitySessions?.map((session) => (
            <StaffBattleSessionRow
              key={`battle-session-${session.id}`}
              activitySession={session}
              currentPlayer={
                players?.find(
                  (player) => player.id === session.currentTurnId,
                ) ?? null
              }
            />
          )) ?? <div>No Battle Sessions...</div>}
        </div>
      </div>
    </div>
  );
}
