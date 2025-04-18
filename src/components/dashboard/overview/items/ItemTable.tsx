import type {
  IAddItemUseCase,
  IDeleteItemUseCase,
} from "@/server/applications/interfaces/usecases/item";
import type { Item } from "@/server/domain/models";
import type { UseCaseParams } from "@/server/controllers/utils";

import { addItem, deleteItem } from "@/server/controllers/items.controller";

import React from "react";
import { useMutation } from "@tanstack/react-query";

import AddItemForm from "./AddItemForm";
import DeleteItemButton from "./DeleteItemButton";
import Image from "next/image";

interface ItemTableProp {
  items: Item[];
  refetch: () => void;
}

export default function ItemTable({ items, refetch }: ItemTableProp) {
  const deleteItemMutation = useMutation({ mutationFn: deleteItem });
  const addItemMutation = useMutation({ mutationFn: addItem });

  const handleDeleteItem = async ({
    itemId,
  }: UseCaseParams<IDeleteItemUseCase>) => {
    await deleteItemMutation
      .mutateAsync({ itemId })
      .catch((error) => console.error(error));
    refetch();
  };

  const handleAddItem = async ({ data }: UseCaseParams<IAddItemUseCase>) => {
    await addItemMutation
      .mutateAsync({ data })
      .catch((error) => console.error(error));
    refetch();
  };
  return (
    <div className="w-full">
      <table className="mb-5 w-full">
        <thead>
          <tr className="bg-seafoam text-left font-bold">
            <th className="pl-4">Id</th>
            <th className="">Name</th>
            <th>Stats</th>
            <th>Type</th>
            <th className="pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr className="border-b border-black" key={item.id}>
              <td className="pl-4">{item.id}</td>
              <td>
                <div className="flex space-x-2">
                  <Image src={item.image} alt="" width={30} height={30}></Image>
                  <p>{item.name}</p>
                </div>
              </td>
              <td>{item.stats.join(", ") || "-"}</td>
              <td>{item.type}</td>
              <td className="flex justify-end py-1 pr-4">
                <DeleteItemButton
                  itemId={item.id}
                  handleDeleteItem={handleDeleteItem}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddItemForm handleAddItem={handleAddItem} />
    </div>
  );
}
