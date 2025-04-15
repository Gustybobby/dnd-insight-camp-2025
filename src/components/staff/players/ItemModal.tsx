import React from "react";

function ItemModal({
  itemName,
  closeModal,
  onSubmit,
}: {
  itemName: string;
  closeModal: () => void;
  onSubmit: (itemId: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-72 rounded-xl border-4 border-oldcream bg-cream p-6 text-center motion-scale-in-0 motion-opacity-in-0">
        <h2 className="mb-4 text-xl font-semibold">{itemName}</h2>
        <p className="mb-4">{`Give ${itemName}`}</p>
        <button
          onClick={() => onSubmit}
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          Give Item
        </button>
        <button
          onClick={closeModal}
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
