import type { PlayerWithAllInfo } from "@/server/domain/aggregates";
import type { ActivitySession } from "@/server/domain/models";

import {
  createActivitySession,
  upsertSessionTurn,
} from "@/server/controllers/activity.controller";

import React from "react";
import { useMutation } from "@tanstack/react-query";

import StaffBattleRow from "./StaffBattlePlayerRow";
import StaffBattleSessionRow from "./StaffBattleSessionRow";

interface UpsertPlayerMutationType {
  sessionId: number;
  playerId: number;
  order: number;
}

interface CreateActivitySessionMutationType {
  activityId: number;
  players: (PlayerWithAllInfo & { turn: number })[];
}

interface StaffBattleTabProps {
  players?: PlayerWithAllInfo[] | null;
  activitySessions: ActivitySession[] | null;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const selectedPlayers = players?.filter(
      (player) => formData.get(`player-${player.id}-check`) === "on",
    );

    const formattedPlayers = selectedPlayers
      ?.map((player, index) => {
        const rawTurn = formData.get(`player-${player.id}-turn`);
        const parsedTurn = parseInt(rawTurn as string);
        const isValidTurn = !isNaN(parsedTurn);

        return {
          ...player,
          turn: isValidTurn ? parsedTurn : Infinity, // fallback pushes invalid turns to bottom
          originalIndex: index,
        };
      })
      .sort((a, b) => {
        if (a.turn === b.turn) {
          return a.originalIndex - b.originalIndex;
        }
        return a.turn - b.turn;
      });

    console.log(formattedPlayers);
    battleSessionMutation.mutate({
      activityId: activityBattleId ?? 1,
      players: formattedPlayers ?? [],
    });
  };
  return (
    <div className="flex w-full flex-col gap-y-1 p-2">
      <div className="flex w-full flex-col gap-y-1 text-center">
        <div className="text-center text-2xl font-bold">Battle Sessions</div>
        <div className="flex w-full flex-col justify-between">
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
      <div className="flex w-full flex-col gap-y-1 text-center">
        <div className="flex w-full flex-row justify-between">
          <p className="w-[250px] text-center text-2xl font-bold">Name</p>
          <p className="text-center text-2xl font-bold">Status</p>
          <p className="text-center text-2xl font-bold">Select</p>
          <p className="text-center text-2xl font-bold">Turn</p>
        </div>
        <form onSubmit={handleSubmit}>
          {players?.map((player) => (
            <StaffBattleRow
              key={`player-${player.id}-battle`}
              id={player.id}
              name={player.name}
              character={player.character}
              inBattle={false}
              maxTurn={20}
            />
          ))}
          {/* {activitySessions?.find((session) => session. === null) ? (} */}
          <button type="submit">Create Battle Session</button>
        </form>
      </div>
    </div>
  );
}

export default StaffBattleTab;
