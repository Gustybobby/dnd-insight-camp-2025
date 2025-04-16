import type { Item } from "@/server/domain/models";

import { useState } from "react";

import { ItemCard } from "./components";
import ItemModal from "./ItemModal";

export default function StaffPlayerItems({
  onSubmit,
  items,
}: {
  onSubmit: ({
    itemId,
    amount,
  }: {
    itemId: number;
    amount: number;
  }) => Promise<void>;
  items: Item[] | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const openModal = (itemName: string) => {
    setItemName(itemName);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setItemName("");
  };
  return (
    <div className="flex flex-col gap-y-1 p-2">
      {items?.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={() => openModal(item.name)}
        />
      ))}
      {isModalOpen && (
        <ItemModal
          closeModal={closeModal}
          onSubmit={onSubmit}
          itemId={items?.find((item) => item.name === itemName)?.id ?? 0}
          itemName={itemName}
        />
      )}
    </div>
  );
}
