import React from "react";

import { cn } from "../utils";

type StyledButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function StyledButton({
  onClick,
  children,
  className = "",
  type,
  disabled,
}: StyledButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `cursor-pointer rounded-lg border-2 border-black bg-brown-gradient px-4 py-2 text-black transition hover:opacity-90`,
        `${disabled ? "bg-gray-gradient cursor-not-allowed text-gray-400" : ""}`,
        className,
      )}
      type={type ?? "button"}
      disabled={disabled ?? false}
    >
      {children}
    </button>
  );
}
