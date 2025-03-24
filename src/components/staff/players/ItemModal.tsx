import React from "react";

function ItemModal({
  closeModal,
  onSubmit,
}: {
  closeModal: () => void;
  onSubmit: (itemId: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-72 rounded-xl bg-white p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Modal Title</h2>
        <p className="mb-4">This is the modal content.</p>
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
