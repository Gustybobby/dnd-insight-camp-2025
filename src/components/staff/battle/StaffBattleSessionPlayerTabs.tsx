import React, { useState } from "react";

import { cn } from "@/components/utils";

export default function StaffBattleSessionPlayerTabs({
  tabs,
  defaultTab,
  // isModalOpen,
  // setIsModalOpen,
  className,
}: {
  tabs: {
    label: string;
    node: React.ReactNode;
    modal: React.ReactNode;
  }[];
  defaultTab: string;
  isModalOpen?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
  className: string;
}) {
  const [active, setActive] = useState<string>(defaultTab);

  return (
    <div className={cn("relative py-2", className)}>
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
          "h-full max-h-[290px] min-h-[32vh] w-full overflow-scroll rounded-lg border-4 border-oldcream bg-cream"
        }
      >
        {tabs.find((tab) => tab.label === active)?.node}
      </section>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        {tabs.find((tab) => tab.label === active)?.modal}
      </Modal> */}
    </div>
  );
}
