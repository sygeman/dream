/* Return a map of `squares` and their associated peers, i.e., a set of
other squares in the square's unit. */
export function getSquarePeers(
  squares: string[],
  unitsMap: { [key: string]: string[][] }
) {
  const squarePeersMap: { [key: string]: string[] } = {};

  // For every square...
  for (const si in squares) {
    const curSquare = squares[si];
    const curSquareUnits = unitsMap[curSquare];

    // Maintain list of the current square's peers
    const curSquarePeers: string[] = [];

    // Look through the current square's units map...
    for (const sui in curSquareUnits) {
      const curUnit = curSquareUnits[sui];

      for (const ui in curUnit) {
        const curUnitSquare = curUnit[ui];

        if (
          curSquarePeers.indexOf(curUnitSquare) === -1 &&
          curUnitSquare !== curSquare
        ) {
          curSquarePeers.push(curUnitSquare);
        }
      }
    }

    // Save the current square an its associated peers to the map
    squarePeersMap[curSquare] = curSquarePeers;
  }

  return squarePeersMap;
}
