import type { Item, StatTypeEnum } from "@/server/domain/models";

import { useState } from "react";

export type PlayerWindowOptions =
  | { type: "character" }
  | { type: "statInfo"; statType: StatTypeEnum }
  | { type: "itemInfo"; item: Item };

export function usePlayerWindow() {
  const [window, setWindow] = useState<PlayerWindowOptions>({
    type: "character",
  });

  return { window, setWindow };
}
