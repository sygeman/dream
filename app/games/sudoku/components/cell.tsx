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
    className={clsx(
      "flex justify-center items-center",
      "w-full aspect-square cursor-pointer rounded-sm",
      "font-medium text-base sm:text-lg md:text-xl outline-none",
      {
        "text-indigo-400 dark:text-indigo-400":
          props.notProtected && !props.selected,
        "text-black/50 dark:text-white/50": !(
          props.notProtected && !props.selected
        ),
      },
      props.highlightError
        ? "bg-red-600/20"
        : props.selected
        ? "bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-white ring-2 ring-indigo-500 dark:ring-indigo-400"
        : props.highlightSame
        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300"
        : props.highlightLine
        ? "bg-slate-200/60 dark:bg-slate-700/60"
        : "bg-slate-100/70 dark:bg-slate-800/70"
    )}
    onClick={() => props.onClick?.()}
  >
    {props.value}
  </button>
);
