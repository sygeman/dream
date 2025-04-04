import { findMinCandidates } from "./find-min-candidates";
import { getBoardCandidates } from "./get-board-candidates";
import { getNoEmptyCells } from "./get-no-empty-cells";
import { groupCandidates } from "./group-candidates";
import { setBoardValue } from "./set-board-value";
import { validateBoard } from "./validate-board";

export const fillBoard = (board: string) => {
  let filledBoard = board;
  const invalidCandidates: { id: string; value: string }[] = [];

  const fillNext = () => {
    const candidates = getBoardCandidates(filledBoard, [
      ...getNoEmptyCells(filledBoard),
      ...invalidCandidates,
    ]);
    const cellId = findMinCandidates(groupCandidates(candidates));

    if (!cellId) return false;

    const value = candidates[cellId]?.[0];
    const tmpBoard = setBoardValue(filledBoard, cellId, value);

    if (validateBoard(tmpBoard)) {
      filledBoard = tmpBoard;
    } else {
      invalidCandidates.push({ id: cellId, value });
    }

    return true;
  };

  while (true) {
    try {
      if (!fillNext()) break;
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return filledBoard;
};
