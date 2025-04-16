import React from "react";

function ItemModal({
  itemName,
  itemId,
  closeModal,
  onSubmit,
}: {
  itemName: string;
  itemId: number;
  closeModal: () => void;
  onSubmit: ({
    itemId,
    amount,
  }: {
    itemId: number;
    amount: number;
  }) => Promise<void>;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-72 rounded-xl border-4 border-oldcream bg-cream p-6 text-center motion-scale-in-0 motion-opacity-in-0">
        <h2 className="mb-4 text-xl font-semibold">{itemName}</h2>
        <p className="mb-4">{`Give ${itemName}`}</p>
        <div className="flex flex-row justify-center gap-x-2">
          <button
            onClick={() => onSubmit({ itemId: itemId, amount: 1 })}
            className="bg-brown-gradient rounded-lg border border-black px-4 py-2 text-black"
          >
            Give Item
          </button>
          <button
            onClick={closeModal}
            className="bg-brown-gradient rounded-lg border border-black px-4 py-2 text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
