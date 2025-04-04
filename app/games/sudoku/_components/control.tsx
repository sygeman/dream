import { Component } from "solid-js";
import { BLANK_CHAR } from "../constants";
import { ControlButton } from "./control-button";

const x9Array = [...new Array(9)];

export const Control: Component<{
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
          disabled={props.includesCount[index + 1] === 9}
          onClick={() => props.setValueSelected(`${index + 1}`)}
        >
          {index + 1}
        </ControlButton>
      ))}
    </div>
    <div class="mt-2 flex flex-wrap gap-1 w-full justify-center">
      <button
        classList={{
          "py-1 px-2 rounded": true,
          "bg-slate-800/50 text-gray-400 font-medium uppercase text-sm": true,
          "disabled:opacity-20": true,
        }}
        disabled={props.selectedIsProtected}
        onClick={() => props.setValueSelected(BLANK_CHAR)}
      >
        Erase
      </button>
    </div>
  </>
);
