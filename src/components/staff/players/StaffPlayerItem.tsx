import type { Item } from "@/server/domain/models";
import { ItemCard } from "./components";
import { PlayerItemWithInfo } from "@/server/domain/aggregates";
import { useState } from "react";
import ItemModal from "./ItemModal";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/server/controllers/items.controller";

export function StaffPlayerItems({
  onSubmit,
  items,
}: {
  onSubmit: (itemId: number) => void;
  items: Item[] | null;
}) {
  const onClick = (item: PlayerItemWithInfo["item"]) => {
    console.log(item);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const openModal = (itemName: string) => {
    setItemName(itemName);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="flex flex-col gap-y-1 p-2">
      {items?.map((item) => (
        <ItemCard key={item.id} item={item} onClick={() => openModal(item.name)} />
      ))}
      {isModalOpen && (
        <ItemModal
          closeModal={closeModal}
          onSubmit={onSubmit}
          itemName={itemName}
        />
      )}
    </div>
  );
}
