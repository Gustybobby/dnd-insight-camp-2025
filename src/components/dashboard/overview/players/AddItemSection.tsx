"use client";

import { IAddPlayerItemUseCase } from "@/server/applications/interfaces/usecases/item";
import { addPlayerItem } from "@/server/controllers/items.controller";
import { UseCaseParams } from "@/server/controllers/utils";
import { Item, Player } from "@/server/domain/models";
import React, { useState } from "react";

interface AddItemSectionProp {
  items: Item[];
  playerId: Player["id"];
  handleOnAddNewItem: (
    event: React.FormEvent<HTMLFormElement>,
    { data }: UseCaseParams<IAddPlayerItemUseCase>,
  ) => void;
}

export default function AddItemSection({
  items,
  playerId,
  handleOnAddNewItem,
}: AddItemSectionProp) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const amount = new FormData(event.currentTarget).get("amount");
    const data: UseCaseParams<IAddPlayerItemUseCase> = {
      data: {
        playerId: playerId,
        itemId: Number(selectedItem),
        amount: Number(amount) || 1,
      },
    };
    handleOnAddNewItem(event, data);
    setIsAdding(false);
  };

  return (
    <div className="w-full" onClick={(event) => event.stopPropagation()}>
      {isAdding ? (
        <form
          className="relative flex rounded-lg border border-seafoam text-seafoam"
          onSubmit={(event) => handleOnSubmit(event)}
        >
          <select
            name="item"
            value={selectedItem}
            onChange={(event) => setSelectedItem(event.target.value)}
            className="w-full"
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            name="amount"
            placeholder="Amount:"
            type="number"
            min={1}
            defaultValue={1}
          ></input>
          <button type="submit">Save</button>
        </form>
      ) : (
        <button
          className="w-full rounded-lg border border-seafoam bg-transparent text-center text-seafoam hover:bg-seafoam hover:text-white"
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
