export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
export const COLS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const BLANK_CHAR = ".";
export const SQUARES = ROWS.flatMap((r) => COLS.map((c) => r + c));
export const BLANK_BOARD = SQUARES.map(() => BLANK_CHAR).join("");

export const DIFFICULTY = {
  easy: 30,
  medium: 40,
};
