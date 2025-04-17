"use client";

import { IAddItemUseCase } from "@/server/applications/interfaces/usecases/item";
import { UseCaseParams } from "@/server/controllers/utils";
import { ItemTypeEnum } from "@/server/domain/models";
import React, { useState } from "react";
import { ALL_STAT_TYPES } from "@/shared/stat";

interface AddItemFormProp {
  handleAddItem: ({ data }: UseCaseParams<IAddItemUseCase>) => Promise<void>;
}

export default function AddItemForm({ handleAddItem }: AddItemFormProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const stats = formData
      .getAll("stat")
      .map((stat, index) => {
        if (Number(stat) != 0)
          return `${ALL_STAT_TYPES[index]}:${Number(stat) > 0 ? "+" : ""}${stat}`;
        else return undefined;
      })
      .filter((stat): stat is string => stat != undefined);
    await handleAddItem({
      data: {
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        stats: stats,
        type: ItemTypeEnum.parse(formData.get("type")?.toString()),
      },
    });
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="flex w-full justify-center">
      {isOpen ? (
        <form
          className="flex w-full flex-col space-y-4 rounded-lg bg-slate-200 p-4"
          onSubmit={(event) => handleOnSubmit(event)}
        >
          <div className="flex space-x-8">
            <div className="flex space-x-2">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                placeholder="Item Name"
                type="text"
              ></input>
            </div>
            <div className="flex space-x-2">
              <label htmlFor="type">Type:</label>
              <select id="type" name="type">
                {ItemTypeEnum.options.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea name="description" className="w-full"></textarea>
          </div>
          <div className="flex space-x-4">
            {ALL_STAT_TYPES.map((type, index) => (
              <div key={index} className="flex space-x-2">
                <label htmlFor="stat">{type}:</label>
                <input
                  name="stat"
                  id="stat"
                  type="number"
                  defaultValue={0}
                ></input>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="cursor-pointer rounded-lg bg-red-300 px-3"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-seafoam px-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="size-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </form>
      ) : (
        <button
          className="w-1/2 rounded-lg border-2 border-seafoam bg-white text-center text-seafoam hover:bg-seafoam hover:text-white"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add new Item
        </button>
      )}
    </div>
  );
}
