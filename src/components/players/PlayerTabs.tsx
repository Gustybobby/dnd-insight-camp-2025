import { useState } from "react";

import { CharacterBox } from "@/components/players/components";
import { cn } from "@/components/utils";

export function PlayerTabs({
  tabs,
  defaultTab,
}: {
  tabs: { label: string; node: React.ReactNode }[];
  defaultTab: string;
}) {
  const [active, setActive] = useState<string>(defaultTab);
  return (
    <div className="relative">
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
                "bg-cream border-cream absolute h-2 w-full border",
                tab.label === active ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        ))}
      </div>
      <CharacterBox className="border-oldcream h-full min-h-[32vh]">
        {tabs.find((tab) => tab.label === active)?.node}
      </CharacterBox>
    </div>
  );
}
