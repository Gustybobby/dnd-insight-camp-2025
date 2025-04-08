import type { PlayerStatLogFullInfoPlusPlayerCharacter } from "@/server/domain/aggregates";
import React from "react";
import ItemBox from "./ItemBox";

interface LogTableProp {
  logs: PlayerStatLogFullInfoPlusPlayerCharacter[];
}

export default function LogTable({ logs }: LogTableProp) {
  return (
    <div className="h-60 w-full overflow-y-scroll">
      <table className="w-full">
        <thead className="sticky top-0 z-10">
          <tr className="bg-seafoam text-left font-bold">
            <th className="pl-4">Id</th>
            <th>Character</th>
            <th>Player</th>
            <th>Stat</th>
            <th>Value</th>
            <th>Staff</th>
            <th>Item</th>
            <th className="pr-4">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr className="border-b border-black" key={log.id}>
              <td className="pl-4">{log.id}</td>
              <td>{log.character.name}</td>
              <td>{log.player.name}</td>
              <td>{log.type}</td>
              <td>{log.value}</td>
              <td>{log.staff?.name}</td>
              <td>
                <ItemBox item={log.item} />
              </td>
              <td className="pr-4">{log.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
