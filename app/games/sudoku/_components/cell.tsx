export const Cell = (props: {
  value: string;
  selected?: boolean;
  highlightLine?: boolean;
  highlightSame?: boolean;
  highlightError?: boolean;
  notProtected?: boolean;
  onClick?: () => void;
}) => (
  <button
    classList={{
      "flex justify-center items-center": true,
      "h-8 w-8 cursor-pointer rounded-sm": true,
      "font-medium text-xl text-white/50 outline-none": true,
      "text-indigo-400": props.notProtected && !props.selected,
      "text-white/50": !(props.notProtected && !props.selected),
      [props.highlightError
        ? "bg-red-600/20"
        : props.selected
        ? "bg-indigo-900"
        : props.highlightSame
        ? "bg-transparent"
        : props.highlightLine
        ? "bg-slate-700/60"
        : "bg-slate-800/70"]: true,
    }}
    onClick={() => props.onClick?.()}
  >
    {props.value}
  </button>
);
