// Return a map of `squares` and their associated units (row, col, box)
export function getSquareUnits(squares: string[], units: string[][]) {
  const squareUnitMap: { [key: string]: string[][] } = {};

  // For every square...
  for (let si in squares) {
    const curSquare = squares[si];

    // Maintain a list of the current square's units
    const curSquareUnits = [];

    // Look through the units, and see if the current square is in it,
    // and if so, add it to the list of of the square's units.
    for (let ui in units) {
      const curUnit = units[ui];

      if (curUnit.indexOf(curSquare) !== -1) {
        curSquareUnits.push(curUnit);
      }
    }

    // Save the current square and its units to the map
    squareUnitMap[curSquare] = curSquareUnits;
  }

  return squareUnitMap;
}
