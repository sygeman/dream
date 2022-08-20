import { BLANK_CHAR } from "../constants";
import { getSquareVals } from "./get-square-vals";

export const getNoEmptyCells = (board: string) =>
  Object.entries(getSquareVals(board))
    .filter(([_, v]) => v !== BLANK_CHAR)
    .map(([id, value]) => ({ id, value }));
