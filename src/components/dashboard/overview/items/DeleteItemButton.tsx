"use client";

import type { Item } from "@/server/domain/models";
import type { UseCaseParams } from "@/server/controllers/utils";

import React, { useState } from "react";
import { IDeleteItemUseCase } from "@/server/applications/interfaces/usecases/item";

interface ResetDataButtonProp {
  itemId: Item["id"];
  handleDeleteItem: ({
    itemId,
  }: UseCaseParams<IDeleteItemUseCase>) => Promise<void>;
}

export default function DeleteItemButton({
  itemId,
  handleDeleteItem,
}: ResetDataButtonProp) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    await handleDeleteItem({ itemId });
    setIsLoading(false);
  };

  return (
    <button
      className="text-red cursor-pointer rounded-lg bg-red-400 p-1 px-3 text-white hover:bg-red-500"
      onClick={handleOnClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="size-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      ) : (
        <p>Delete</p>
      )}
    </button>
  );
}
