import { PlayerStatLogFullInfoPlusPlayerCharacter } from "@/server/domain/aggregates";
import React from "react";
import LogRow from "./LogRow";

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
          <LogRow log={log} key={log.id} />
        ))}
      </tbody>
    </table>
  );
}
