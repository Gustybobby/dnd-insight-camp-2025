import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";

import React from "react";

export default function StaffBattleSessionPlayerLogsTab({
  battleSession,
}: {
  battleSession: ActivitySessionAllInfo | null | undefined;
}) {
  return (
    <div className="flex w-full flex-col p-2 font-notosansthai">
      {battleSession?.battleLogs ? (
        battleSession?.battleLogs .slice().reverse().map((log, idx) => {
          const formattedLog = log.replace(/player (\d+)/g, (_, num) => {
            const letter = String.fromCharCode(64 + Number(num)); // A = 65
            return `player ${letter}`;
          });
          return (
            <div
              key={`log-${idx}`}
              className="flex w-full flex-row justify-between text-md"
              onClick={() => {}}
            >
              <div>{formattedLog}</div>
            </div>
          );
        })
      ) : (
        <div className="flex w-full justify-center text-center">No Logs</div>
      )}
    </div>
  );
}
