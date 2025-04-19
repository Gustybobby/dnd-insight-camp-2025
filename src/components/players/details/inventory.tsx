import type { PlayerItemWithInfo } from "@/server/domain/aggregates";
import type { StatTypeEnum } from "@/server/domain/models";

import { EQUIPPABLE_ITEM_TYPES } from "@/shared/item";

import { STAT_STYLE_MAP } from "@/components/players/style";
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
      {playerItem?.amount && playerItem.amount > 1 ? (
        <p className="absolute -bottom-1 right-1 font-bold">
          x{playerItem?.amount}
        </p>
      ) : null}
    </ItemIcon>
  );
}

export function ItemInfo({
  item,
  equipped,
  partEquipped,
  showPlayerOptions,
  showStaffOptions,
  onClickBack,
  onEquip,
  onRemove,
  onUngive,
}: {
  item: PlayerItemWithInfo["item"] | null;
  equipped: boolean;
  partEquipped: boolean;
  showPlayerOptions: boolean;
  showStaffOptions?: boolean;
  onClickBack: () => void;
  onEquip: (itemId: PlayerItemWithInfo["itemId"]) => void;
  onRemove: (itemId: PlayerItemWithInfo["itemId"]) => void;
  onUngive?: (
    itemId: PlayerItemWithInfo["itemId"],
    isEquipped: boolean,
  ) => void;
}) {
  if (!item) {
    onClickBack();
    return null;
  }
  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-4 p-2">
      <button className="font-bold" onClick={onClickBack}>
        {"←"} Back
      </button>
      <div className="grid w-full grid-cols-4 gap-4">
        <ItemIcon item={item} />
        <h1 className="col-span-3 rounded-full bg-oldcream px-8 py-2 text-center font-notosansthai text-xl font-bold">
          {item.name}
        </h1>
        <div className="col-span-full flex items-center justify-between">
          <InfoBadge className="bg-oldcream">{item.type}</InfoBadge>
          <div className="flex items-center gap-2">
            {item.stats
              .map((statText) => statText.split(":"))
              .map(([statType, value], idx) => (
                <InfoBadge
                  key={idx}
                  className={STAT_STYLE_MAP[statType as StatTypeEnum].bgColor}
                >
                  {statType} {value}
                </InfoBadge>
              ))}
          </div>
        </div>
        <p className="col-span-full text-left font-notosansthai">
          {item.description}
        </p>
      </div>
      {showPlayerOptions && EQUIPPABLE_ITEM_TYPES.includes(item.type) ? (
        <>
          {partEquipped ? (
            <button
              className="rounded-full border-2 border-black bg-lightorange/30 px-4 py-1 font-bold"
              disabled
            >
              {item.type} is equipped
            </button>
          ) : equipped ? (
            <button
              className="rounded-full border-2 border-black bg-lightorange px-4 py-1 font-bold"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          ) : (
            <button
              className="rounded-full border-2 border-black bg-lightorange px-4 py-1 font-bold"
              onClick={() => onEquip(item.id)}
            >
              Equip
            </button>
          )}
        </>
      ) : null}
      {showStaffOptions && (
        <button
          className="rounded-full border-2 border-black bg-red-500 px-4 py-1 font-bold"
          onClick={() => onUngive?.(item.id, equipped)}
        >
          Delete Item
        </button>
      )}
    </div>
  );
}

export function InfoBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn("rounded-full px-4 py-1 text-center font-bold", className)}
    >
      {children}
    </span>
  );
}
