import { cn } from "@/lib/utils";
import { DIGITS } from "../utils/constants";

interface ControlsProps {
  selectedValue: string | null;
  counts: { [key: string]: number };
  onValueSelect: (value: string) => void;
}

export function Controls({
  selectedValue,
  counts,
  onValueSelect,
}: ControlsProps) {
  return (
    <div className="grid grid-cols-9 gap-px bg-neutral-800 p-px">
      {DIGITS.map((digit) => (
        <button
          key={digit}
          className={cn(
            "flex h-10 w-10 items-center justify-center text-xl font-bold transition-colors",
            selectedValue === digit && "bg-neutral-800",
            "hover:bg-neutral-900",
            counts[digit] >= 9 && "text-neutral-400"
          )}
          onClick={() => onValueSelect(digit)}
          disabled={counts[digit] >= 9}
        >
          {digit}
        </button>
      ))}
    </div>
  );
}
