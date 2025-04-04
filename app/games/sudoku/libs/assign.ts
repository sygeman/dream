import { eliminate } from "./eliminate";

/* Eliminate all values, *except* for `val`, from `candidates` at 
`square` (candidates[square]), and propagate. Return the candidates map
when finished. If a contradiciton is found, return false.

WARNING: This will modify the contents of `candidates` directly.
*/
export function assign(
  candidates: { [key: string]: string },
  square: string,
  val: string
) {
  // Grab a list of canidates without 'val'
  const otherVals = candidates[square].replace(val, "");

  // Loop through all other values and eliminate them from the candidates
  // at the current square, and propigate. If at any point we get a
  // contradiction, return false.
  for (let ovi = 0; ovi < otherVals.length; ovi++) {
    const otherVal = otherVals[ovi];
    const candidatesNext = eliminate(candidates, square, otherVal);
    if (!candidatesNext) return false;
  }

  return candidates;
}
