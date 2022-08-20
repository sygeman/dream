import { SQUARES } from "../constants";

// Return a map of squares -> values
export function getSquareVals(board: string) {
  const squaresValsMap: { [key: string]: string } = {};

  // Make sure `board` is a string of length 81
  if (board.length != SQUARES.length) {
    console.error("Board/squares length mismatch.");
  } else {
    for (let i = 0; i < SQUARES.length; i++) {
      squaresValsMap[SQUARES[i]] = board[i];
    }
  }

  return squaresValsMap;
}
