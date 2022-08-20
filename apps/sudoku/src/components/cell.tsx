import clsx from "clsx";

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
    class={clsx(
      "flex justify-center items-center h-8 w-8 cursor-pointer rounded-sm",
      "font-medium text-xl text-white/50 outline-none",
      props.notProtected && !props.selected
        ? "text-indigo-400"
        : "text-white/50",
      props.highlightError
        ? "bg-red-600/20"
        : props.selected
        ? "bg-indigo-900"
        : props.highlightSame
        ? "bg-transparent"
        : props.highlightLine
        ? "bg-slate-700/60"
        : "bg-slate-800/70"
    )}
    onClick={() => props.onClick && props.onClick()}
  >
    {props.value}
  </button>
);
