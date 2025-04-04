import { useEffect, useMemo } from "react";
import { BLANK_CHAR, DIGITS, ROWS } from "./constants";

export const useShortcut = ({
  selected,
  select,
  setValueSelected,
}: {
  selected: string;
  select: (value: string) => void;
  setValueSelected: (value: string) => void;
}) => {
  const rowsAsArray = ROWS.split("");
  const colsAsArray = DIGITS.split("");

  const selectedData = useMemo(() => {
    const [row, col] = selected.split("");
    const indexRow = rowsAsArray.findIndex((r) => r === row);
    const indexCol = colsAsArray.findIndex((c) => c === col);
    return { row, col, indexRow, indexCol };
  }, [selected, rowsAsArray, colsAsArray]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "Backspace" || key === "Delete") {
        setValueSelected(BLANK_CHAR);
        return;
      }

      if (DIGITS.includes(key)) {
        setValueSelected(key);
        return;
      }

      const { indexRow, indexCol, row, col } = selectedData;

      switch (key) {
        case "ArrowUp":
          if (indexRow > 0) {
            select(`${rowsAsArray[indexRow - 1]}${col}`);
          }
          break;
        case "ArrowDown":
          if (indexRow < rowsAsArray.length - 1) {
            select(`${rowsAsArray[indexRow + 1]}${col}`);
          }
          break;
        case "ArrowLeft":
          if (indexCol > 0) {
            select(`${row}${colsAsArray[indexCol - 1]}`);
          }
          break;
        case "ArrowRight":
          if (indexCol < colsAsArray.length - 1) {
            select(`${row}${colsAsArray[indexCol + 1]}`);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedData, select, setValueSelected, rowsAsArray, colsAsArray]);
};
