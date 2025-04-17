import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import React from "react";

import StaffBattleRow from "./StaffBattlePlayerRow";
import StaffBattleSessionRow from "./StaffBattleSessionRow";

interface StaffBattleTabProps {
  players?: PlayerWithAllInfo[] | null;
  activitySessions: ActivitySession[] | null;
}

export type ActivitySession = {
  id: number;
  activityId: number;
  createdAt: Date;
  currentTurnId: number | null;
  battleLogs: string[];
};

export default function StaffBattleTab({
  players,
  activitySessions,
}: StaffBattleTabProps) {
  console.log(activitySessions);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.getAll("1-check"));
    // const selectedPlayers = players?.filter((player) =>
    //   formData.get(`${player.id}-check`),
    // );
    // const maxTurn = parseInt(formData.get("maxTurn") as string, 10);
    // console.log(selectedPlayers, maxTurn);
  };
  return (
    <div className="flex w-full flex-col gap-y-1 p-2">
      <div className="flex w-full flex-col gap-y-1 text-center">
        <p className="text-2xl font-bold">Battle Sessions</p>
        {activitySessions?.length != 0 ? (
          activitySessions?.map((session) => (
            <StaffBattleSessionRow
              key={session.id}
              activitySession={session}
              currentPlayer={
                players?.find(
                  (player) => player.id === session.currentTurnId,
                ) ?? null
              }
            />
          ))
        ) : (
          <div>No Battle Sessions...</div>
        )}
      </div>
      <div className="">
        <div className="flex w-full flex-row justify-between">
          <p className="w-[250px] text-center text-2xl font-bold">Name</p>
          <p className="text-center text-2xl font-bold">Status</p>
          <p className="text-center text-2xl font-bold">Select</p>
          <p className="text-center text-2xl font-bold">Turn</p>
        </div>
        <form onSubmit={onSubmit}  className="flex w-full flex-col gap-y-1">
            {players?.map((player) => (
              <StaffBattleRow
                key={player.id}
                id={player.id}
                name={player.name}
                character={player.character}
                inBattle={false}
                maxTurn={20}
              />
            ))}
            <button className="" type="submit">Create a new battle session</button>
        </form>
      </div>
    </div>
  );
}
