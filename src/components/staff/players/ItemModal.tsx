import type { Item } from "@/server/domain/models";

import React from "react";

function ItemModal({
  item,
  modalOpen,
  closeModal,
  onSubmit,
}: {
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
    <div>
      <h2 className="mb-4 text-xl font-semibold">{item?.name}</h2>
      <p className="mb-4">{`Give ${item?.name}`}</p>
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
