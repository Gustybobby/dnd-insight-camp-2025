import React, { useState } from "react";

import { CharacterBox } from "@/components/players/components";
import { cn } from "@/components/utils";

export function StaffPlayerUtils({
  tabs,
  defaultTab,
}: {
  tabs: { label: string; node: React.ReactNode }[];
  defaultTab: string;
}) {
  const [active, setActive] = useState<string>(defaultTab);

  return (
    <div className="relative mt-[16%]">
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
      <CharacterBox className="h-full max-h-[90%] min-h-[32vh] w-full border-oldcream">
        {tabs.find((tab) => tab.label === active)?.node}
      </CharacterBox>
    </div>
  );
}
