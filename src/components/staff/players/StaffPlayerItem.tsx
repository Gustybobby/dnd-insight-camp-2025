import type { Item } from "@/server/domain/models";
import { ItemCard } from "./components";
import { PlayerItemWithInfo } from "@/server/domain/aggregates";
import { useState } from "react";
import ItemModal from "./ItemModal";

export function StaffPlayerItems({
  items,
  onSubmit,
}: {
  items: Item[];
  onSubmit: (itemId: number) => void;
}) {
  const onClick = (item: PlayerItemWithInfo["item"]) => {
    console.log(item);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="p-2">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onClick={openModal} />
      ))}
      {isModalOpen && <ItemModal closeModal={closeModal} onSubmit={onSubmit} />}
    </div>
  );
}
