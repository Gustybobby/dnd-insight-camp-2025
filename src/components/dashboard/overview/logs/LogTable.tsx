import type { PlayerStatLogFullInfoPlusPlayerCharacter } from "@/server/domain/aggregates";
import React from "react";

interface LogTableProp {
  logs: PlayerStatLogFullInfoPlusPlayerCharacter[];
}

export default function LogTable({ logs }: LogTableProp) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="border text-left">
          <th>Character</th>
          <th>Player</th>
          <th>Stat</th>
          <th>Value</th>
          <th>Staff</th>
          <th>Effect</th>
          <th>Item</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr className="border" key={log.id}>
            <td>{log.character.name}</td>
            <td>{log.player.name}</td>
            <td>{log.type}</td>
            <td>{log.value}</td>
            <td>{log.staff?.name}</td>
            <td>{log.effect?.type}</td>
            <td>{log.item?.id}</td>
            <td>{log.createdAt.toUTCString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
