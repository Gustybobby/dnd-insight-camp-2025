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
      <div className="flex w-full items-center px-1.5">
        {tabs.map((tab) => (
          <div key={tab.label} className="relative w-full">
            <button
              className={cn(
                "w-full rounded-t-2xl text-base font-semibold",
                tab.label === active ? "bg-cream" : "bg-oldcream",
              )}
              onClick={() => setActive(tab.label)}
            >
              <p className="mt-0.5">{tab.label}</p>
            </button>
            <div
              className={cn(
                "absolute h-1 w-full border border-cream bg-cream",
                tab.label === active ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        ))}
      </div>
      <CharacterBox className="h-full min-h-[32vh] border-oldcream bg-[url(/asset/cover/paper_texture.jpg)] bg-center">
        {tabs.find((tab) => tab.label === active)?.node}
      </CharacterBox>
    </div>
  );
}
