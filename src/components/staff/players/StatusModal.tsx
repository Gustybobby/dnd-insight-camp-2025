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
    <div className="font-notosansthai flex flex-col items-center gap-y-2">
      <h2 className="text-xl font-semibold">{status?.name}</h2>
      <p className="">{`Give ${status?.name}`}</p>
      <p className="text-sm italic">{status?.description}</p>
      <label className="">{`Last for (turns)`}</label>
      <input className="w-fit text-center" id={`give-${status}-input`} />
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
              !isNaN(countdown) &&
              countdown > 0
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
