import type { onSubmitStatusInput } from "../battle/StaffBattleSession";
import type { StatusType } from "../constants";

import React from "react";

export default function StatusModal({
  status,
  modalOpen,
  closeModal,
  onSubmit,
  submitButtonText,
  selectedPlayerId,
}: {
  status: StatusType | null;
  modalOpen: boolean;
  closeModal: () => void;
  selectedPlayerId: number;
  onSubmit: ({
    effectType,
    playerIds,
    countdown,
  }: onSubmitStatusInput) => Promise<void>;
  submitButtonText: string;
}) {
  console.log(modalOpen);
  return (
    <div className="font-notosansthai">
      <h2 className="mb-4 text-xl font-semibold">{status?.name}</h2>
      <p className="mb-4">{`Give ${status?.name}`}</p>
      <p className="mb-4 text-sm italic">{status?.description}</p>
      <label className="mb-4">{`Last for (turns)`}</label>
      <input id={`give-${status}-input`} />
      <div className="flex flex-row justify-center gap-x-2">
        <button
          onClick={async () => {
            const countdown = parseInt(
              (
                document.getElementById(
                  `give-${status}-input`,
                ) as HTMLInputElement
              ).value,
            );
            if (
              status?.name !== null &&
              status !== undefined &&
              !isNaN(countdown)
            ) {
              await onSubmit({
                effectType: status?.name ?? "Advantage",
                playerIds: [selectedPlayerId],
                countdown: countdown,
              });
            }
          }}
          className="rounded-lg border border-black bg-brown-gradient px-4 py-2 text-black"
        >
          {submitButtonText}
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
