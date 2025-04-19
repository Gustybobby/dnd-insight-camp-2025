import type { ActivitySessionAllInfo } from "@/server/domain/aggregates";

import React from "react";

export default function StaffBattleSessionPlayerLogsTab({
  battleSession,
  onClickLog,
}: {
  battleSession: ActivitySessionAllInfo | null | undefined;
  onClickLog: ({ label, data }: { label: string; data: string }) => void;
}) {
  return (
    <div className="flex w-full flex-col p-2 font-notosansthai gap-y-2">
      {battleSession?.battleLogs ? (
        battleSession?.battleLogs
          .slice()
          .reverse()
          .map((log, idx) => {
            const formattedLog = log.replace(/player (\d+)/g, (_, num) => {
              const letter = String.fromCharCode(64 + Number(num)); // A = 65
              return `player ${letter}`;
            });
            const skillName = log.match(/used\s+(.+)/);
            return (
              <div
                key={`log-${idx}`}
                className="text-sm flex w-full cursor-pointer flex-row justify-between border-2 border-black bg-white rounded-md p-2  "
                onClick={() =>
                  onClickLog({ label: "Logs", data: skillName?.[1] ?? "" })
                }
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
