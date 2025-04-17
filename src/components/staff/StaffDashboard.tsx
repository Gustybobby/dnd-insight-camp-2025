import React, { useState } from "react";

import { cn } from "@/components/utils";
import Link from "next/link";

export default function StaffDashboard({
  tabs,
  defaultTab,
}: {
  tabs: { label: string; node?: React.ReactNode }[];
  defaultTab: string;
}) {
  const [active, setActive] = useState<string>(defaultTab);
  return (
    <div className="w-md flex h-full w-full flex-col items-center gap-y-4 rounded-md bg-cream p-4">
      <h1 className="text-center text-4xl font-bold text-darkred">
        Staff Dashboard
      </h1>
      <div className="flex w-full items-center gap-2 px-1.5">
        {tabs.map((tab) => (
          <div key={tab.label} className="relative w-full">
            <button
              className={cn(
                "w-full rounded-xl border-2 border-black text-lg font-semibold",
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
      <div className="relative flex h-full w-full overflow-scroll bg-center">
        {tabs.find((tab) => tab.label === active)?.node}
      </div>
      <Link href={"/"}>Go Back to Home</Link>
    </div>
  );
}
