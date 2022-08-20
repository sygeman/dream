import clsx from "clsx";
import { Component } from "solid-js";
import { BLANK_CHAR } from "../constants";
import { ControlButton } from "./control-button";

const x9Array = [...new Array(9)];

export const Control: Component<{
  debug: boolean;
  includesCount: {
    [key: string]: number;
  };
  selectedIsProtected: boolean;
  setValueSelected: (value: string) => void;
}> = (props) => (
  <>
    <div class="flex flex-wrap gap-1 w-full justify-center">
      {x9Array.map((_value, index) => (
        <ControlButton
          // key={index}
          disabled={props.includesCount[index + 1] === 9}
          onClick={() => props.setValueSelected(`${index + 1}`)}
        >
          <>
            {index + 1}
            {props.debug && (
              <span class="absolute top-0 right-0 text-xs scale-75 px-0.5 opacity-50">
                {`${9 - props.includesCount[index + 1]}`}
              </span>
            )}
          </>
        </ControlButton>
      ))}
    </div>
    <div class="mt-2 flex flex-wrap gap-1 w-full justify-center">
      <button
        class={clsx(
          "py-1 px-2 rounded",
          "bg-slate-800/50 text-gray-400 font-medium uppercase text-sm",
          "disabled:opacity-20"
        )}
        disabled={props.selectedIsProtected}
        onClick={() => props.setValueSelected(BLANK_CHAR)}
      >
        Erase
      </button>
    </div>
  </>
);
