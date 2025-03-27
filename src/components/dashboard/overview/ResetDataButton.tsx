"use client";
import { resetPlayerData } from "@/server/controllers/player.controller";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Player } from "@/server/domain/models";

export default function ResetDataButton() {
  const resetDataMutation = useMutation({ mutationFn: resetPlayerData });

  const handleOnClick = ({ playerId }: { playerId: Player["id"] }) => {
    resetDataMutation.mutate({ playerId });
  };
  return <button onClick={() => handleOnClick({ playerId: 1 })}>Btn</button>;
}
