import type { Item } from "@/server/domain/models";

import { useState } from "react";

import { ItemCard } from "./components";
import ItemModal from "./ItemModal";

export default function StaffPlayerItems({
  items,
  onClickItem,
}: {
  items: Item[] | null;
  onClickItem: ({ label, data }: { label: string; data: Item }) => void;
}) {
  return (
    <div className="flex flex-col gap-y-1 p-2">
      {items?.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={() => onClickItem({ label: "Item", data: item })}
        />
      ))}
    </div>
  );
}
