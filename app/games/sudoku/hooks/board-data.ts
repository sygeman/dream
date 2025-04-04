import { useMemo } from "react";
import { BLANK_BOARD, BLANK_CHAR, DIGITS, SQUARES } from "../constants";
import { BoardData } from "../types/board-all";
import { fillBoard } from "../libs/fill-board";
import { getSquareVals } from "../libs/get-square-vals";

export const useBoardData = (
  initBoard: string,
  board: string,
  selected: string
) => {
  const initValues = useMemo(() => getSquareVals(initBoard), [initBoard]);
  const values = useMemo(() => getSquareVals(board), [board]);
  const solution = useMemo(
    () => (initBoard === BLANK_BOARD ? BLANK_BOARD : fillBoard(initBoard)),
    [initBoard]
  );

  const boardData = useMemo(() => {
    const cells: BoardData = {};

    for (const si in SQUARES) {
      const id = SQUARES[si];
      const [row, col] = id.split("");
      const initValue = initValues[id];
      const value = values[id];
      const [selectedRow, selectedCol] = selected.split("");
      const index = SQUARES.findIndex((v) => v === id);
      const isError =
        solution[index] !== BLANK_CHAR &&
        value !== BLANK_CHAR &&
        solution[index] !== value;

      cells[id] = {
        id,
        value,
        index,
        selected: selected === id,
        selectedLine: row === selectedRow || col === selectedCol,
        selectedSame: DIGITS.includes(value) && value === values[selected],
        protected: initValue !== BLANK_CHAR,
        error: isError,
      };
    }

    return cells;
  }, [initValues, values, selected, solution]);

  return { boardData, solution };
};
