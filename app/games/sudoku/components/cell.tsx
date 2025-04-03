"use client";

interface CellProps {
  value: string;
  selected?: boolean;
  highlightLine?: boolean;
  highlightSame?: boolean;
  highlightError?: boolean;
  notProtected?: boolean;
  onClick?: () => void;
}

export function Cell({
  value,
  selected,
  highlightLine,
  highlightSame,
  highlightError,
  notProtected,
  onClick,
}: CellProps) {
  return (
    <button
      className={`
        flex justify-center items-center
        h-8 w-8 cursor-pointer rounded-sm
        font-medium text-xl outline-none
        ${notProtected && !selected ? "text-indigo-400" : "text-white/50"}
        ${
          highlightError
            ? "bg-red-600/20"
            : selected
            ? "bg-indigo-900"
            : highlightSame
            ? "bg-transparent"
            : highlightLine
            ? "bg-slate-700/60"
            : "bg-slate-800/70"
        }
      `}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
