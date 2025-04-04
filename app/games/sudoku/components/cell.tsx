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
      "h-8 w-8 cursor-pointer rounded-sm",
      "font-medium text-xl outline-none",
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
        ? "bg-indigo-100 dark:bg-indigo-900 text-black dark:text-white"
        : props.highlightSame
        ? "bg-transparent"
        : props.highlightLine
        ? "bg-slate-200/60 dark:bg-slate-700/60"
        : "bg-slate-100/70 dark:bg-slate-800/70"
    )}
    onClick={() => props.onClick?.()}
  >
    {props.value}
  </button>
);
