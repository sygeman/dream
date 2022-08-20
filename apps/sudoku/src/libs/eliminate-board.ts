import { BLANK_CHAR } from "../constants";
import { shuffle } from "../utils/shuffle";
import { getBoardCandidates } from "./get-board-candidates";
import { getNoEmptyCells } from "./get-no-empty-cells";
import { groupCandidates } from "./group-candidates";
import { setBoardValue } from "./set-board-value";

export const eliminateBoard = (board: string, count: number) => {
  let eliminatedBoard = board;
  const invalidEliminateIds = new Set();

  const getEmptyCount = () => {
    return eliminatedBoard.split("").filter((c) => c === BLANK_CHAR).length;
  };

  const getCellsForEliminate = () =>
    Object.values(getNoEmptyCells(eliminatedBoard)).filter(
      (cell) => cell.value !== BLANK_CHAR && !invalidEliminateIds.has(cell.id)
    );

  const eliminateRandom = () => {
    const randomCell = shuffle(getCellsForEliminate())?.[0];
    if (!randomCell) return null;
    eliminatedBoard = setBoardValue(eliminatedBoard, randomCell.id, BLANK_CHAR);
    return randomCell;
  };

  const eliminateNext = () => {
    let eliminatedCell = null;

    while (getCellsForEliminate().length > 0) {
      const cell = eliminateRandom();

      if (cell) {
        const candidates = getBoardCandidates(eliminatedBoard);
        const candidatesGroup = groupCandidates(candidates);

        const valid =
          candidatesGroup.size === 1 &&
          candidatesGroup.keys().next().value === 1;

        if (!valid) {
          invalidEliminateIds.add(cell.id);
          eliminatedBoard = setBoardValue(eliminatedBoard, cell.id, cell.value);
          break;
        }

        eliminatedCell = cell;
        break;
      }
    }

    return eliminatedCell;
  };

  while (getCellsForEliminate().length > 0 && getEmptyCount() < count) {
    eliminateNext();
  }

  return eliminatedBoard;
};
