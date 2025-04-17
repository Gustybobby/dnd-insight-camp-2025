import type { Item } from "@/server/domain/models";

import { ItemCard } from "./components";

export default function StaffPlayerItems({
  items,
  onClickItem,
}: {
  items: Item[] | null;
  onClickItem: ({ label, data }: { label: string; data: Item }) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-y-1 p-2">
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
