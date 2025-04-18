import type {
  ActivitySessionAllInfo,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";

import {
  createActivitySession,
  updateActivitySession,
  upsertSessionTurn,
} from "@/server/controllers/activity.controller";

import React from "react";
import { useMutation } from "@tanstack/react-query";

import StyledButton from "../StyledButton";
import StaffCreateBattleBossRow from "./StaffCreateBattleBossRow";
import StaffCreateBattleRow from "./StaffCreateBattlePlayerRow";

interface UpsertPlayerMutationType {
  sessionId: number;
  playerId: number;
  order: number;
}

interface UpdateActivitySessionMutation {
  sessionId: number;
  bossTurnOrder: number;
}

interface CreateActivitySessionMutationType {
  activityId: number;
  players: (PlayerWithAllInfo & { turn: number })[];
  bossTurnOrder: number | null | undefined;
}

interface StaffBattleTabProps {
  players?: PlayerWithAllInfo[] | null;
  activitySessions: ActivitySessionAllInfo[] | null;
}

export default function StaffCreateBattleTab({
  players,
  activitySessions,
}: StaffBattleTabProps) {
  const updateActivitySessionMutation = useMutation({
    mutationFn: ({ sessionId, bossTurnOrder }: UpdateActivitySessionMutation) =>
      updateActivitySession({
        sessionId: sessionId,
        data: {
          bossTurnOrder: bossTurnOrder,
        },
      }),
    onSuccess: async (data) => {
      console.log("Player turn updated successfully", data);
    },
  });

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
          order: index + 1,
        });
      });
      if (
        variables.bossTurnOrder !== null &&
        variables.bossTurnOrder &&
        !isNaN(variables.bossTurnOrder)
      ) {
        updateActivitySessionMutation.mutate({
          sessionId: session?.id ?? 1,
          bossTurnOrder: variables.bossTurnOrder,
        });
      } else {
        updateActivitySessionMutation.mutate({
          sessionId: session?.id ?? 1,
          bossTurnOrder: variables.players.length + 1,
        });
      }
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
    const bossTurnOrder = parseInt(formData.get(`boss-turn`) as string);

    console.log("Formatted Players:", formattedPlayers);
    battleSessionMutation.mutate({
      activityId: activityBattleId ?? 1,
      players: formattedPlayers ?? [],
      bossTurnOrder: bossTurnOrder,
    });
  };

  const playersWithInBattle = players?.map((player) => {
    const playerIdsInBattle = activitySessions
      ?.filter((activitySession) => activitySession.isActive)
      .flatMap((activitySession) =>
        activitySession.turns.flatMap((turn) => turn.playerId),
      );
    return {
      ...player,
      inBattle: playerIdsInBattle?.includes(player.id) ?? false,
    };
  });
  return (
    <div className="flex w-full flex-col gap-y-1 p-2">
      <div className="flex w-full flex-col gap-y-1 text-center">
        <div className="grid w-full grid-cols-4 flex-row place-items-center justify-between px-4 text-center text-2xl font-bold">
          <h2 className="w-[250px]">Name</h2>
          <h2 className="">Status</h2>
          <h2 className="">Select</h2>
          <h2 className="">Order</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <div className="flex h-[90%] w-full flex-col items-center gap-y-1 overflow-y-scroll">
            {playersWithInBattle?.map((player) => (
              <StaffCreateBattleRow
                key={`player-${player.id}-battle`}
                id={player.id}
                name={player.name}
                character={player.character}
                inBattle={player.inBattle}
                maxTurn={players ? players.length + 1 : 0}
              />
            ))}
          </div>
          <StaffCreateBattleBossRow
            maxTurn={players ? players.length + 1 : 0}
          />
          <StyledButton type="submit" className="mt-8 w-fit self-center">
            Create a Battle Session
          </StyledButton>
        </form>
      </div>
    </div>
  );
}
