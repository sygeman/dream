import { cross } from "../utils/cross";

// List of all units (rows, cols, boxes)
export function getUnits(rows: string, cols: string) {
  const units: string[][] = [];

  // Rows
  for (let ri = 0; ri < rows.length; ri++) {
    units.push(cross(rows[ri], cols));
  }

  // Columns
  for (let ci = 0; ci < cols.length; ci++) {
    units.push(cross(rows, cols[ci]));
  }

  // Boxes
  const rowSquares = ["ABC", "DEF", "GHI"];
  const colSquares = ["123", "456", "789"];

  for (const rsi in rowSquares) {
    for (const csi in colSquares) {
      units.push(cross(rowSquares[rsi], colSquares[csi]));
    }
  }

  return units;
}
