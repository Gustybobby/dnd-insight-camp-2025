import type { Skill } from "@/server/domain/models";

import React from "react";

export default function SkillLogModal({
  skill,
  closeModal,
}: {
  skill: Skill | null;
  closeModal: () => void;
}) {
  return (
    <div className="black font-notosansthai">
      <h2 className="mb-4 text-xl font-semibold">{skill?.name}</h2>
      <p className="mb-4">{`Give ${skill?.name}`}</p>
      <p className="mb-4 text-sm italic">{skill?.description}</p>
      <button
        onClick={closeModal}
        className="rounded-lg border border-black bg-brown-gradient px-4 py-2 text-black"
      >
        Close
      </button>
    </div>
  );
}
