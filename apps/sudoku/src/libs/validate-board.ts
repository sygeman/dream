import { getBoardCandidates } from "./get-board-candidates";

export const validateBoard = (
  board: string,
  exclude: { id: string; value: string }[] = []
) => {
  const candidates = getBoardCandidates(board, exclude);
  return Object.values(candidates).filter((o) => o).length > 0;
};
