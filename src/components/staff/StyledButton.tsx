import React from "react";

import { cn } from "../utils";

type StyledButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function StyledButton({
  onClick,
  children,
  className = "",
  type
}: StyledButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `rounded-lg border-2 border-black bg-brown-gradient px-4 py-2 text-black transition hover:opacity-90`,
        className,
      )}
      type={type ?? "button"}
    >
      {children}
    </button>
  );
}
