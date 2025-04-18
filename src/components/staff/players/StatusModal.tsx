import type { Skill } from "@/server/domain/models";

import React from "react";

export default function StatusModal({
  skill,
  modalOpen,
  closeModal,
  onSubmit,
  heading,
}: {
  skill: Skill | null;
  modalOpen: boolean;
  closeModal: () => void;
  onSubmit: ({
    skillId,
    remainingUses,
  }: {
    skillId: number;
    remainingUses: number;
  }) => Promise<void>;
  heading: string;
}) {
  console.log(modalOpen);
  return (
    <div className="font-notosansthai">
      <h2 className="mb-4 text-xl font-semibold">{skill?.name}</h2>
      <p className="mb-4">{`Give ${skill?.name}`}</p>
      <p className="mb-4 text-sm italic">{skill?.description}</p>
      <div className="flex flex-row justify-center gap-x-2">
        <button
          onClick={() =>
            onSubmit({ skillId: skill?.id ?? 0, remainingUses: 1 })
          }
          className="rounded-lg border border-black bg-brown-gradient px-4 py-2 text-black"
        >
          {heading}
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
