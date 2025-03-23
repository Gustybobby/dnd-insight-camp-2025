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

export function Inventory({ items }: { items: PlayerItemWithInfo[] }) {
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
          />
        ))}
    </div>
  );
}

export function ItemSlot({
  className,
  playerItem,
}: {
  className?: string;
  playerItem: PlayerItemWithInfo | null;
}) {
  return (
    <div
      className={cn(
        "motion-preset-pop relative flex size-12 items-center justify-center rounded-lg border-2 border-black bg-oldcream shadow-lg motion-duration-200",
        className,
      )}
    >
      {playerItem?.item.image ? (
        <Image
          src={playerItem.item.image}
          alt="item"
          width={128}
          height={128}
          className="size-8"
        />
      ) : null}
      <p className="absolute -bottom-1 right-1 font-bold">
        {playerItem?.amount}
      </p>
    </div>
  );
}
