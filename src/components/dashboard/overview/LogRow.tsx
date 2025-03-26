import type { PlayerStatLogFullInfoPlusPlayerCharacter } from "@/server/domain/aggregates";

import React from "react";

interface LogRowProp {
  log: PlayerStatLogFullInfoPlusPlayerCharacter;
}

export default function LogRow({ log }: LogRowProp) {
  return (
    <tr className="border">
      <td>{log.character.name}</td>
      <td>{log.player.name}</td>
      <td>{log.type}</td>
      <td>{log.value}</td>
      <td>{log.staff?.name}</td>
      <td>{log.effect?.type}</td>
      <td>{log.item?.id}</td>
      <td>{log.createdAt.toUTCString()}</td>
    </tr>
  );
}
