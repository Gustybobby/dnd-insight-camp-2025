"use client";
import { resetPlayerData } from "@/server/controllers/player.controller";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Player } from "@/server/domain/models";

interface ResetDataButtonProp {
  playerId: Player["id"];
  refetchPlayers: () => void;
  refetchLogs: () => void;
}

export default function ResetDataButton({
  playerId,
  refetchPlayers,
  refetchLogs,
}: ResetDataButtonProp) {
  const resetDataMutation = useMutation({ mutationFn: resetPlayerData });

  const handleOnClick = ({ playerId }: { playerId: Player["id"] }) => {
    resetDataMutation.mutate(
      { playerId },
      {
        onSuccess: () => {
          refetchPlayers();
          refetchLogs();
        },
        onError: (error) => {
          console.error("Mutation failed:", error);
        },
      },
    );
  };
  return (
    <button
      className="text-red cursor-pointer rounded-lg bg-red-200 p-1 px-3 hover:bg-red-300"
      onClick={() => handleOnClick({ playerId })}
    >
      Reset
    </button>
  );
}
