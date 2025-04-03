"use client";

import { cn } from "@/lib/utils";

interface CellProps {
  id: string;
  value: string;
  isSelected: boolean;
  isProtected: boolean;
  isError: boolean;
  onClick: () => void;
}

export function Cell({
  id,
  value,
  isSelected,
  isProtected,
  isError,
  onClick,
}: CellProps) {
  return (
    <button
      className={cn(
        "flex h-10 w-10 items-center justify-center border border-neutral-800 text-xl font-bold transition-colors",
        isSelected && "bg-neutral-800",
        isProtected && "text-neutral-400",
        !isProtected && "hover:bg-neutral-900",
        isError && "text-red-500"
      )}
      onClick={onClick}
    >
      {value !== "0" ? value : ""}
    </button>
  );
}
