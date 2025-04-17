import React, { useState } from "react";

import { CharacterBox } from "@/components/players/components";
import { cn } from "@/components/utils";
import { Modal } from "./components";

export function StaffPlayerUtils({
  tabs,
  defaultTab,
  isModalOpen,
  setIsModalOpen,
}: {
  tabs: {
    label: string;
    node: React.ReactNode;
    modal: React.ReactNode;
  }[];
  defaultTab: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const [active, setActive] = useState<string>(defaultTab);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative px-4 py-2">
      <div className="flex w-full items-center gap-2 px-1.5">
        {tabs.map((tab) => (
          <div key={tab.label} className="relative w-full">
            <button
              className={cn(
                "w-full rounded-t-3xl text-lg font-semibold",
                tab.label === active ? "bg-cream" : "bg-oldcream",
              )}
              onClick={() => setActive(tab.label)}
            >
              {tab.label}
            </button>
            <div
              className={cn(
                "absolute h-2 w-full border border-cream bg-cream",
                tab.label === active ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        ))}
      </div>

      <section
        className={
          "h-full max-h-[680px] min-h-[32vh] w-full overflow-scroll rounded-lg border-4 border-oldcream bg-cream"
        }
      >
        {tabs.find((tab) => tab.label === active)?.node}
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {tabs.find((tab) => tab.label === active)?.modal}
      </Modal>
    </div>
  );
}
