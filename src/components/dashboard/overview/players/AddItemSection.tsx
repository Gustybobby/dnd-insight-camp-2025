"use client";

import type { IAddPlayerItemUseCase } from "@/server/applications/interfaces/usecases/item";
import type { Item, Player } from "@/server/domain/models";
import type { UseCaseParams } from "@/server/controllers/utils";

import React, { useState } from "react";

interface AddItemSectionProp {
  items: Item[];
  playerId: Player["id"];
  handleOnAddNewItem: (
    event: React.FormEvent<HTMLFormElement>,
    { data }: UseCaseParams<IAddPlayerItemUseCase>,
  ) => Promise<void>;
}

export default function AddItemSection({
  items,
  playerId,
  handleOnAddNewItem,
}: AddItemSectionProp) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(
    items[0].id.toString() || "",
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    const amount = new FormData(event.currentTarget).get("amount");
    const data: UseCaseParams<IAddPlayerItemUseCase> = {
      data: {
        playerId: playerId,
        itemId: Number(selectedItem),
        amount: Number(amount) || 1,
      },
    };
    await handleOnAddNewItem(event, data);
    setIsAdding(false);
    setIsLoading(false);
  };

  return (
    <div className="w-full" onClick={(event) => event.stopPropagation()}>
      {isAdding ? (
        <form
          className="relative flex space-x-4 text-black"
          onSubmit={(event) => handleOnSubmit(event)}
        >
          <select
            name="item"
            value={selectedItem}
            onChange={(event) => setSelectedItem(event.target.value)}
            className="flex-1 rounded-lg border-2 border-seafoam px-2"
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="flex space-x-2 rounded-lg border-2 border-seafoam bg-white px-2">
            <label htmlFor="amount">Amount:</label>
            <input
              id="amount"
              name="amount"
              className="w-16 rounded-lg rounded-l-none"
              placeholder="Amount:"
              type="number"
              min={1}
              defaultValue={1}
            ></input>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-seafoam px-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="size-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <p>Save</p>
            )}
          </button>
        </form>
      ) : (
        <button
          className="w-full rounded-lg border-2 border-seafoam bg-white text-center text-seafoam hover:bg-seafoam hover:text-white"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          Add new Item
        </button>
      )}
    </div>
  );
}
