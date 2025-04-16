import type { Item } from "@/server/domain/models";
import { ItemCard } from "./components";
import { PlayerItemWithInfo } from "@/server/domain/aggregates";
import { useState } from "react";
import ItemModal from "./ItemModal";

export function StaffPlayerItems({
  onSubmit,
  items,
  playerId,
}: {
  onSubmit: ({
    itemId,
    amount,
  }: {
    itemId: number;
    amount: number;
  }) => Promise<void>;
  items: Item[] | null;
  playerId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const openModal = (itemName: string, itemId: number) => {
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
          onClick={() => openModal(item.name, item.id)}
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
