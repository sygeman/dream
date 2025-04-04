import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

export const HeaderButton = ({ size = "md", ...props }: HeaderButtonProps) => (
  <button
    className={clsx(
      "flex rounded transition-colors delay-75",
      "bg-slate-100 dark:bg-slate-800 text-black/60 dark:text-gray-400 font-medium uppercase",
      "hover:bg-slate-200 dark:hover:bg-slate-700",
      "disabled:opacity-20",
      {
        "px-2 py-0.5 text-xs": size === "sm",
        "px-3 py-1 text-sm": size === "md",
        "px-4 py-1.5 text-base sm:text-lg": size === "lg",
      }
    )}
    {...props}
  />
);
