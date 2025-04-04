import { FC } from "react";
import clsx from "clsx";
import { BLANK_CHAR } from "../constants";
import { ControlButton } from "./control-button";

const x9Array = [...new Array(9)];

interface ControlProps {
  includesCount: {
    [key: string]: number;
  };
  selectedIsProtected: boolean;
  setValueSelected: (value: string) => void;
}

export const Control: FC<ControlProps> = (props) => (
  <>
    <div className="flex flex-wrap gap-1 w-full justify-center">
      {x9Array.map((_value, index) => (
        <ControlButton
          key={index}
          disabled={props.includesCount[index + 1] === 9}
          onClick={() => props.setValueSelected(`${index + 1}`)}
        >
          {index + 1}
        </ControlButton>
      ))}
    </div>
    <div className="mt-2 flex flex-wrap gap-1 w-full justify-center">
      <button
        className={clsx(
          "py-1 px-2 rounded",
          "bg-slate-100/50 dark:bg-slate-800/50 text-black/60 dark:text-gray-400 font-medium uppercase text-sm",
          "hover:bg-slate-200 dark:hover:bg-slate-700",
          "disabled:opacity-20"
        )}
        disabled={props.selectedIsProtected}
        onClick={() => props.setValueSelected(BLANK_CHAR)}
      >
        Стереть
      </button>
    </div>
  </>
);
