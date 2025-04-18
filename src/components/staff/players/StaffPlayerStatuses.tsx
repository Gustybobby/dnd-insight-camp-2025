import type { StatusType } from "../constants";

import { VISUAL_EFFECT_LISTS } from "../constants";
import { StatusCard } from "./components";

export default function StaffPlayerStatuses({
  onClickStatus,
}: {
  onClickStatus: ({ label, data }: { label: string; data: StatusType }) => void;
}) {
  return (
    <div className="flex flex-col gap-y-1 p-2">
      {VISUAL_EFFECT_LISTS?.map((status) => {
        return (
          <StatusCard
            key={`status-${status.name.toLowerCase()}`}
            status={status}
            onClick={() => onClickStatus({ label: "Status", data: status })}
          />
        );
      })}
    </div>
  );
}
