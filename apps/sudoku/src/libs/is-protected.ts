import { BLANK_BOARD, BLANK_CHAR, SQUARES } from "../constants";
import { getSquareVals } from "./get-square-vals";

export const isProtected = (
  initBoard: string = BLANK_BOARD,
  selected: string = SQUARES[0]
) => getSquareVals(initBoard)[selected] !== BLANK_CHAR;
