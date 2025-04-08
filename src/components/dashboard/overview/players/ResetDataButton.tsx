"use client";

import React, { useState } from "react";
import { Player } from "@/server/domain/models";
import { IResetPlayerDataUseCase } from "@/server/applications/interfaces/usecases/player";
import { UseCaseParams } from "@/server/controllers/utils";

interface ResetDataButtonProp {
  playerId: Player["id"];
  handleOnResetPlayer: (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId }: UseCaseParams<IResetPlayerDataUseCase>,
  ) => Promise<void>;
}

export default function ResetDataButton({
  playerId,
  handleOnResetPlayer,
}: ResetDataButtonProp) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsLoading(true);
    await handleOnResetPlayer(event, { playerId });
    setIsLoading(false);
  };

  return (
    <button
      className="text-red cursor-pointer rounded-lg bg-red-400 p-1 px-3 text-white hover:bg-red-500"
      onClick={(event) => handleOnClick(event)}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="size-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      ) : (
        <p>Reset</p>
      )}
    </button>
  );
}
