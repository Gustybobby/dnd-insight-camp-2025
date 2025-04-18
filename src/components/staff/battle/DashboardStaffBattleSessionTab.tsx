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
function StaffBattleTab({ players, activitySessions }: StaffBattleTabProps) {
  const upsertPlayerMutation = useMutation({
    mutationFn: ({ sessionId, playerId, order }: UpsertPlayerMutationType) =>
      upsertSessionTurn({
        data: {
          sessionId: sessionId,
          playerId: playerId,
          order: order,
        },
      }),
    onSuccess: async (data) => {
      console.log("Player turn updated successfully", data);
    },
  });

  const battleSessionMutation = useMutation({
    mutationFn: async ({ activityId }: CreateActivitySessionMutationType) => {
      return await createActivitySession({ activityId });
    },
    onSuccess: async (session, variables) => {
      console.log("Battle session created successfully", session);
      console.log("Adding players to session");

      variables?.players.forEach((player, index) => {
        upsertPlayerMutation.mutate({
          sessionId: session?.id ?? 1,
          playerId: player.id,
          order: index,
        });
      });
    },
  });

  const activityBattleId = activitySessions?.[0].activityId;

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
