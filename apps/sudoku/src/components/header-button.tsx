import clsx from "clsx";
import { Component, JSX } from "solid-js";

export const HeaderButton: Component<{
  children?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}> = (props) => (
  <button
    class={clsx(
      "flex px-2 py-0.5 rounded transition-colors delay-75",
      "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
      "hover:bg-slate-700",
      "disabled:opacity-20"
    )}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
