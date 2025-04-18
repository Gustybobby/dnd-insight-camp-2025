import type {
  ActivitySessionAllInfo,
  PlayerWithAllInfo,
} from "@/server/domain/aggregates";

import {
  createActivitySession,
  updateActivitySession,
  upsertSessionTurn,
} from "@/server/controllers/activity.controller";

import { useMutation } from "@tanstack/react-query";

import StyledButton from "../StyledButton";
import StaffCreateBattleBossRow from "./StaffCreateBattleBossRow";
import StaffCreateBattleRow from "./StaffCreateBattlePlayerRow";

interface UpsertPlayerMutationType {
  sessionId: number;
  playerId: number;
  order: number;
}

export interface UpdateActivitySessionMutation {
  sessionId: number;
  bossTurnOrder: number;
}

interface CreateActivitySessionMutationType {
  activityId: number;
  players: { id: number; turn: number }[];
  bossTurnOrder: number;
}

interface StaffBattleTabProps {
  players?: PlayerWithAllInfo[] | null;
  activitySessions: ActivitySessionAllInfo[] | null;
  activityId: number;
}

export default function StaffCreateBattleTab({
  players,
  activitySessions,
  activityId,
}: StaffBattleTabProps) {
  const updateActivitySessionMutation = useMutation({
    mutationFn: updateActivitySession,
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
      if (!session) {
        return;
      }
      console.log("Battle session created successfully", session);
      console.log("Adding players to session");

      const sessionTurns = await Promise.all(
        variables.players.map((player) =>
          upsertPlayerMutation.mutateAsync({
            sessionId: session.id,
            playerId: player.id,
            order: player.turn,
          }),
        ),
      );

      updateActivitySessionMutation.mutate({
        sessionId: session.id,
        data: {
          bossTurnOrder: variables.bossTurnOrder,
          isActive: true,
          currentTurnId: sessionTurns.find(
            (sessionTurn) => sessionTurn?.order === 1,
          )?.id,
        },
      });
      alert(`Session ${session?.id} has been created`);
    },
  });

  const activityBattleId = activityId;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const selectedPlayers = players?.filter(
      (player) => formData.get(`player-${player.id}-check`) === "on",
    );

    if (!selectedPlayers || selectedPlayers.length === 0) {
      alert("no player selected");
      return;
    }

    const formattedPlayers: { id: string; turn: number }[] = [];

    const bossTurnOrder = Number(formData.get(`boss-turn`));
    console.log("Boss Turn Order:", bossTurnOrder);
    if (!bossTurnOrder || isNaN(bossTurnOrder)) {
      alert("invalid boss turn");
      return;
    }

    formattedPlayers.push({ id: "boss", turn: bossTurnOrder });

    for (const player of selectedPlayers) {
      const rawTurnData = formData.get(`player-${player.id}-turn`);
      const turn = Number(rawTurnData);
      if (!turn || isNaN(turn)) {
        alert(`invalid turn for player ${player.id}: ${rawTurnData}`);
        return;
      }
      formattedPlayers.push({ id: String(player.id), turn });
    }
    formattedPlayers.sort((a, b) => a.turn - b.turn);

    for (let i = 0; i < formattedPlayers.length - 1; i++) {
      if (i == 0 && formattedPlayers[i].turn !== 1) {
        alert("turn must start with 1");
        return;
      }
      if (formattedPlayers[i + 1].turn - formattedPlayers[i].turn !== 1) {
        alert(
          `${formattedPlayers[i].id} to ${formattedPlayers[i + 1].id} invalid turn sequence`,
        );
        return;
      }
    }

    console.log("Formatted Players:", formattedPlayers);
    battleSessionMutation.mutate({
      activityId: activityBattleId ?? 1,
      players: formattedPlayers
        .filter(({ id }) => id !== "boss")
        .map((player) => ({ ...player, id: Number(player.id) })),
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
        <div>
          <h1 className="text-xl font-bold">In Battle</h1>
          {playersWithInBattle
            ?.filter(({ inBattle }) => inBattle)
            .map((player) => (
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
        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <div className="flex h-[90%] w-full flex-col items-center gap-y-1">
            <h1 className="text-xl font-bold">Selectable</h1>
            {playersWithInBattle
              ?.filter(({ inBattle }) => !inBattle)
              .map((player) => (
                <StaffCreateBattleRow
                  key={`player-${player.id}-battle`}
                  id={player.id}
                  name={player.name}
                  character={player.character}
                  inBattle={player.inBattle}
                  maxTurn={players ? players.length + 1 : 0}
                />
              ))}
            <StaffCreateBattleBossRow
              maxTurn={players ? players.length + 1 : 0}
            />
          </div>

          <StyledButton type="submit" className="mt-8 w-fit self-center">
            Create a Battle Session
          </StyledButton>
        </form>
      </div>
    </div>
  );
}
