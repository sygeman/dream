import { cross } from "./cross";
import { ROWS, COLS, SQUARES } from "./constants";

// Получаем все единицы (строки, столбцы, блоки)
export function getUnits(rows: string, cols: string) {
  const units: string[][] = [];

  // Строки
  for (let ri = 0; ri < rows.length; ri++) {
    units.push(cross(rows[ri], cols));
  }

  // Столбцы
  for (let ci = 0; ci < cols.length; ci++) {
    units.push(cross(rows, cols[ci]));
  }

  // Блоки 3x3
  const rowSquares = ["ABC", "DEF", "GHI"];
  const colSquares = ["123", "456", "789"];

  for (const rsi in rowSquares) {
    for (const csi in colSquares) {
      units.push(cross(rowSquares[rsi], colSquares[csi]));
    }
  }

  return units;
}

// Получаем карту единиц для каждой ячейки
export function getSquareUnits(squares: string[], units: string[][]) {
  const squareUnitMap: { [key: string]: string[][] } = {};

  for (let si in squares) {
    const curSquare = squares[si];
    const curSquareUnits = [];

    for (let ui in units) {
      const curUnit = units[ui];
      if (curUnit.indexOf(curSquare) !== -1) {
        curSquareUnits.push(curUnit);
      }
    }

    squareUnitMap[curSquare] = curSquareUnits;
  }

  return squareUnitMap;
}

// Получаем связанные ячейки для каждой ячейки
export function getSquarePeers(
  squares: string[],
  unitsMap: { [key: string]: string[][] }
) {
  const squarePeersMap: { [key: string]: string[] } = {};

  for (let si in squares) {
    const curSquare = squares[si];
    const curSquareUnits = unitsMap[curSquare];
    const curSquarePeers: string[] = [];

    for (let sui in curSquareUnits) {
      const curUnit = curSquareUnits[sui];

      for (let ui in curUnit) {
        let curUnitSquare = curUnit[ui];

        if (
          curSquarePeers.indexOf(curUnitSquare) === -1 &&
          curUnitSquare !== curSquare
        ) {
          curSquarePeers.push(curUnitSquare);
        }
      }
    }

    squarePeersMap[curSquare] = curSquarePeers;
  }

  return squarePeersMap;
}

// Создаем все необходимые структуры данных
export const UNITS = getUnits(ROWS.join(""), COLS.join(""));
export const SQUARE_UNITS = getSquareUnits(SQUARES, UNITS);
export const SQUARE_PEERS = getSquarePeers(SQUARES, SQUARE_UNITS);
