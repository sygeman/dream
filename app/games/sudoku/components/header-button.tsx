import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export const HeaderButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => (
  <button
    className={clsx(
      "flex px-2 py-0.5 rounded transition-colors delay-75",
      "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
      "hover:bg-slate-700",
      "disabled:opacity-20"
    )}
    {...props}
  />
);
