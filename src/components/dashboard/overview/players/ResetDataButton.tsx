"use client";
import { resetPlayerData } from "@/server/controllers/player.controller";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Player } from "@/server/domain/models";
import { IResetPlayerDataUseCase } from "@/server/applications/interfaces/usecases/player";
import { UseCaseParams } from "@/server/controllers/utils";

interface ResetDataButtonProp {
  playerId: Player["id"];
  handleOnResetPlayer: (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId }: UseCaseParams<IResetPlayerDataUseCase>,
  ) => void;
}

export default function ResetDataButton({
  playerId,
  handleOnResetPlayer,
}: ResetDataButtonProp) {
  return (
    <button
      className="text-red cursor-pointer rounded-lg bg-red-400 p-1 px-3 text-white hover:bg-red-500"
      onClick={(event) => handleOnResetPlayer(event, { playerId })}
    >
      Reset
    </button>
  );
}
