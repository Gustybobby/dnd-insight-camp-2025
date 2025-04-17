"use client";

import type { StatTypeEnum } from "@/server/domain/models";

import { useState } from "react";

export type PlayerWindowOptions =
  | { type: "character" }
  | { type: "statInfo"; statType: StatTypeEnum }
  | { type: "itemInfo"; itemId: number }
  | { type: "skillInfo"; skillId: number };

export function usePlayerWindow() {
  const [window, setWindow] = useState<PlayerWindowOptions>({
    type: "character",
  });

  return { window, setWindow };
}
