import type { PlayerItemWithInfo } from "@/server/domain/aggregates";

import { cn } from "@/components/utils";
import Image from "next/image";

const delays = [
  "motion-delay-0",
  "motion-delay-[200ms]",
  "motion-delay-[400ms]",
  "motion-delay-[600ms]",
  "motion-delay-[800ms]",
];

export function Inventory({
  items,
  onClick,
}: {
  items: PlayerItemWithInfo[];
  onClick?: (item: PlayerItemWithInfo["item"]) => void;
}) {
  return (
    <div className="grid grid-cols-5 place-items-center gap-4 px-2 py-6">
      {Array(5 * 4)
        .fill(0)
        .map((_, idx) => (
          <ItemSlot
            key={items[idx]?.itemId ?? `slot ${idx}`}
            className={cn(
              delays[Math.floor(idx / 5)],
              items[idx] ? "hover:cursor-pointer" : "",
            )}
            playerItem={items[idx] ?? null}
            onClick={onClick}
          />
        ))}
    </div>
  );
}

export function ItemIcon({
  className,
  item,
  children,
  onClick,
}: {
  className?: string;
  item: PlayerItemWithInfo["item"] | null;
  children?: React.ReactNode;
  onClick?: (item: PlayerItemWithInfo["item"]) => void;
}) {
  return (
    <div
      className={cn(
        "motion-preset-pop relative flex size-12 items-center justify-center rounded-lg border-2 border-black bg-oldcream shadow-lg motion-duration-200",
        className,
      )}
      onClick={() => {
        if (item) {
          onClick?.(item);
        }
      }}
    >
      {item?.image ? (
        <Image
          src={item.image}
          alt="item"
          width={128}
          height={128}
          className="size-8"
        />
      ) : null}
      {children}
    </div>
  );
}

export function ItemSlot({
  className,
  playerItem,
  onClick,
}: {
  className?: string;
  playerItem: PlayerItemWithInfo | null;
  onClick?: (item: PlayerItemWithInfo["item"]) => void;
}) {
  return (
    <ItemIcon
      className={className}
      item={playerItem?.item ?? null}
      onClick={onClick}
    >
      <p className="absolute -bottom-1 right-1 font-bold">
        {playerItem?.amount}
      </p>
    </ItemIcon>
  );
}

export function ItemInfo({
  item,
  onClickBack,
}: {
  item: PlayerItemWithInfo["item"];
  onClickBack: () => void;
}) {
  return (
    <div className="w-full p-2">
      <button className="mb-4 font-bold" onClick={onClickBack}>
        {"←"} Back
      </button>
      <div className="grid grid-cols-4 gap-4">
        <ItemIcon item={item} />
        <h1 className="col-span-3 rounded-full bg-oldcream px-8 py-2 text-center text-xl font-bold">
          {item.name}
        </h1>
        <p className="col-span-full text-left">{item.description}</p>
      </div>
    </div>
  );
}
