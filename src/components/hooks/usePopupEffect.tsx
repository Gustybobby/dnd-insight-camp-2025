import { useCallback, useState } from "react";

import { cn } from "@/components/utils";

export interface PopupData {
  id: number;
  text: string;
  duration: number;
  x: number;
  y: number;
  className?: string;
}

export type Popper = (data: Omit<PopupData, "id">) => void;

export function usePopupEffect() {
  const [popups, setPopups] = useState<PopupData[]>([]);

  const popper = useCallback(
    (data: Omit<PopupData, "id">) => {
      const id = Math.floor(Math.random() * 1000000);
      setPopups((popups) => {
        const newPopups = [...popups, { ...data, id }];
        return newPopups;
      });
      setTimeout(() => {
        setPopups((popups) => popups.filter((popup) => popup.id !== id));
      }, data.duration);
    },
    [setPopups],
  );

  return { popups, popper };
}

export function Popups({ popups }: { popups: PopupData[] }) {
  return (
    <>
      {popups.map((popup) => (
        <div
          key={popup.id}
          className={cn(
            "motion-preset-slide-up-lg fixed z-50 font-notosansthai font-bold text-black",
            popup.className,
          )}
          style={{
            left: popup.x,
            top: popup.y,
            WebkitTextStroke: "0.5px black",
          }}
        >
          {popup.text}
        </div>
      ))}
    </>
  );
}
