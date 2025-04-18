"use client";

import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

export async function fetchPlayerAllInfo({
  playerId,
}: {
  playerId: PlayerWithAllInfo["id"];
}): Promise<PlayerWithAllInfo | null> {
  const res = await fetch(`/api/players/${playerId}?action=allInfo`);
  return res.json();
}
