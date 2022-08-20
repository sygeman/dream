import { DIGITS, SQUARES } from "../constants";
import { getSquareVals } from "./get-square-vals";
import { assign } from "./assign";

export function getCandidates(board: string) {
  const squaresValuesMap = getSquareVals(board);
  const candidateMap: { [key: string]: string } = {};

  // Start by assigning every digit as a candidate to every square
  for (let si in SQUARES) {
    candidateMap[SQUARES[si]] = DIGITS;
  }

  // For each non-blank square, assign its value in the candidate map and
  // propigate.
  for (let square in squaresValuesMap) {
    const val = squaresValuesMap[square];

    if (DIGITS.includes(val)) {
      const newCandidates = assign(candidateMap, square, val);

      // Fail if we can't assign val to square
      if (!newCandidates) return false;
    }
  }

  return candidateMap;
}
