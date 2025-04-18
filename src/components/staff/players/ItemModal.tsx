import type { Item, StatTypeEnum } from "@/server/domain/models";

import React from "react";

import { InfoBadge } from "@/components/players/details/inventory";
import { STAT_STYLE_MAP } from "@/components/players/style";

function ItemModal({
  item,
  modalOpen,
  playerName,
  closeModal,
  onSubmit,
}: {
  playerName?: string;
  item: Item | null;
  modalOpen: boolean;
  closeModal: () => void;
  onSubmit: ({
    itemId,
    amount,
  }: {
    itemId: number;
    amount: number;
  }) => Promise<void>;
}) {
  console.log(modalOpen);
  return (
    <div className="flex flex-col gap-y-4 font-notosansthai">
      <h2 className="text-xl font-semibold">{item?.name}</h2>
      <p className="">{`Give ${item?.name} to "${playerName}"`}</p>
      <div className="flex w-full flex-row justify-center gap-x-2">
        {item?.stats
          .map((statText) => statText.split(":"))
          .map(([statType, value], idx) => (
            <InfoBadge
              key={idx}
              className={
                STAT_STYLE_MAP[statType as StatTypeEnum].bgColor +
                " px-2 text-xs font-semibold"
              }
            >
              {statType} {value}
            </InfoBadge>
          ))}
      </div>
      <div className="italic">{item?.description}</div>
      <div className="flex flex-row justify-center gap-x-2">
        <button
          onClick={() => onSubmit({ itemId: item?.id ?? 0, amount: 1 })}
          className="rounded-lg border border-black bg-brown-gradient px-4 py-2 text-black"
        >
          Give Item
        </button>
        <button
          onClick={closeModal}
          className="rounded-lg border border-black bg-brown-gradient px-4 py-2 text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
