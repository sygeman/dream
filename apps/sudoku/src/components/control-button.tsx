import clsx from "clsx";
import { JSX } from "solid-js";

export const ControlButton = (props: {
  children: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    class={clsx(
      "h-8 w-8 flex items-center justify-center rounded relative transition-colors delay-75",
      "bg-slate-800/50 text-gray-400 font-medium text-xl",
      "hover:bg-slate-700",
      "disabled:opacity-20"
    )}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
