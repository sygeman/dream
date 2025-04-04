import { cross } from "../utils/cross";
import { getUnits } from "../libs/get-units";
import { getSquareUnits } from "../libs/get-square-units";
import { getSquarePeers } from "../libs/get-square-peers";

export const MIN_GIVENS = 17;
export const NR_SQUARES = 81;
export const BLANK_CHAR = "0";
export const DIGITS = "123456789";
export const ROWS = "ABCDEFGHI";
export const COLS = DIGITS;
export const SQUARES = cross(ROWS, COLS);
export const UNITS = getUnits(ROWS, COLS);
export const SQUARE_UNITS = getSquareUnits(SQUARES, UNITS);
export const SQUARE_PEERS = getSquarePeers(SQUARES, SQUARE_UNITS);
export const BLANK_BOARD = new Array(NR_SQUARES).fill(BLANK_CHAR).join("");

export const DIFFICULTY = {
  easy: 43,
  medium: 51,
  hard: 56,
};

export const GITHUB_LINK = "https://github.com/sygeman/sudoku";
