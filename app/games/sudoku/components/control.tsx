"use client";

import { BLANK_CHAR } from "../utils/constants";

interface ControlButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

function ControlButton({ disabled, onClick, children }: ControlButtonProps) {
  return (
    <button
      className={`
        h-8 w-8 rounded
        bg-slate-800/50 text-gray-400 font-medium text-lg
        disabled:opacity-20
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface ControlProps {
  includesCount: {
    [key: string]: number;
  };
  selectedIsProtected: boolean;
  setValueSelected: (value: string) => void;
}

export function Control({
  includesCount,
  selectedIsProtected,
  setValueSelected,
}: ControlProps) {
  return (
    <>
      <div className="flex flex-wrap gap-1 w-full justify-center">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <ControlButton
            key={num}
            disabled={includesCount[num] === 9}
            onClick={() => setValueSelected(String(num))}
          >
            {num}
          </ControlButton>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1 w-full justify-center">
        <button
          className={`
            py-1 px-2 rounded
            bg-slate-800/50 text-gray-400 font-medium uppercase text-sm
            disabled:opacity-20
          `}
          disabled={selectedIsProtected}
          onClick={() => setValueSelected(BLANK_CHAR)}
        >
          Erase
        </button>
      </div>
    </>
  );
}
