import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export const ControlButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => (
  <button
    className={clsx(
      "h-8 w-8 flex items-center justify-center rounded relative",
      "transition-colors delay-75",
      "bg-slate-100/50 dark:bg-slate-800/50 text-black/60 dark:text-gray-400 font-medium text-xl",
      "hover:bg-slate-200 dark:hover:bg-slate-700",
      "disabled:opacity-20"
    )}
    {...props}
  />
);
