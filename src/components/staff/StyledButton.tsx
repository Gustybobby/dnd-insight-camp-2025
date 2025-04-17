import React from "react";

import { cn } from "../utils";

type StyledButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function StyledButton({
  onClick,
  children,
  className = "",
}: StyledButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `rounded-lg border border-black bg-brown-gradient px-4 py-2 text-black transition hover:opacity-90`,
        className,
      )}
    >
      {children}
    </button>
  );
}
