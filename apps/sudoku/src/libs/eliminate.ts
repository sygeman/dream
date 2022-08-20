import { assign } from "./assign";
import { SQUARE_PEERS, SQUARE_UNITS } from "../constants";

/* Eliminate `val` from `candidates` at `square`, (candidates[square]),
  and propagate when values or places <= 2. Return updated candidates,
  unless a contradiction is detected, in which case, return false.
  
  WARNING: This will modify the contents of `candidates` directly.
*/
export function eliminate(
  candidates: { [key: string]: string },
  square: string,
  val: string
) {
  // If `val` has already been eliminated from candidates[square], return
  // with candidates.
  if (!candidates[square].includes(val)) return candidates;

  // Remove `val` from candidates[square]
  candidates[square] = candidates[square].replace(val, "");

  // If the square has only candidate left, eliminate that value from its
  // peers
  const nrCandidates = candidates[square].length;
  if (nrCandidates === 1) {
    const targetVal = candidates[square];

    for (const pi in SQUARE_PEERS[square]) {
      const peer = SQUARE_PEERS[square][pi];

      const candidatesNew = eliminate(candidates, peer, targetVal);
      if (!candidatesNew) return false;
    }

    // Otherwise, if the square has no candidates, we have a contradiction.
    // Return false.
  }

  if (nrCandidates === 0) return false;

  // If a unit is reduced to only one place for a value, then assign it
  for (const ui in SQUARE_UNITS[square]) {
    const unit = SQUARE_UNITS[square][ui];

    const valPlaces = [];
    for (const si in unit) {
      const unitSquare = unit[si];
      if (candidates[unitSquare].includes(val)) {
        valPlaces.push(unitSquare);
      }
    }

    // If there's no place for this value, we have a contradition!
    // return false
    if (valPlaces.length === 0) {
      return false;

      // Otherwise the value can only be in one place. Assign it there.
    } else if (valPlaces.length === 1) {
      const candidatesNew = assign(candidates, valPlaces[0], val);
      if (!candidatesNew) return false;
    }
  }

  return candidates;
}
