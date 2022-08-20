import { createShortcut } from "@solid-primitives/keyboard";
import { Accessor, createMemo, Setter } from "solid-js";
import { BLANK_CHAR, DIGITS, ROWS } from "./constants";

export const shortcut = ({
  selected,
  select,
  setValueSelected,
}: {
  selected: Accessor<string>;
  select: Setter<string>;
  setValueSelected: (value: string) => void;
}) => {
  const rowsAsArray = ROWS.split("");
  const colsAsArray = DIGITS.split("");

  const selectedData = createMemo(() => {
    const [row, col] = selected().split("");
    const indexRow = rowsAsArray.findIndex((r) => r === row);
    const indexCol = colsAsArray.findIndex((c) => c === col);
    return { row, col, indexRow, indexCol };
  });

  ["Backspace", "Delete"].forEach((key) => {
    createShortcut([key], () => setValueSelected(BLANK_CHAR));
  });

  DIGITS.split("").forEach((key) => {
    createShortcut([key], () => setValueSelected(key));
  });

  createShortcut(["ArrowUp"], () => {
    const { indexRow, col } = selectedData();
    if (indexRow > 0) select(`${rowsAsArray[indexRow - 1]}${col}`);
  });

  createShortcut(["ArrowDown"], () => {
    const { indexRow, col } = selectedData();
    if (indexRow < rowsAsArray.length - 1)
      select(`${rowsAsArray[indexRow + 1]}${col}`);
  });

  createShortcut(["ArrowLeft"], () => {
    const { indexCol, row } = selectedData();
    if (indexCol > 0) select(`${row}${colsAsArray[indexCol - 1]}`);
  });

  createShortcut(["ArrowRight"], () => {
    const { indexCol, row } = selectedData();
    if (indexCol < colsAsArray.length - 1)
      select(`${row}${colsAsArray[indexCol + 1]}`);
  });
};
