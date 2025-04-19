"use client";

import type {
  PlayerEquipmentWithInfo,
  PlayerItemWithInfo,
} from "@/server/domain/aggregates";
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

export function usePlayerItems({
  playerItems,
  equipments,
}: {
  playerItems?: PlayerItemWithInfo[];
  equipments?: PlayerEquipmentWithInfo[];
}) {
  function getItemById(itemId: number): PlayerItemWithInfo | null {
    return playerItems?.find(({ item }) => item.id === itemId) ?? null;
  }

  function getEquipmentById(itemId: number): PlayerEquipmentWithInfo | null {
    return equipments?.find(({ item }) => item.id === itemId) ?? null;
  }

  function isPartEquipped(itemId: number): boolean {
    return !!equipments?.some(
      ({ item }) => item.type === getItemById(itemId)?.item.type,
    );
  }

  return { getItemById, getEquipmentById, isPartEquipped };
}
