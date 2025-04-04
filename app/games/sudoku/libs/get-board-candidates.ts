import { getCandidates } from "./get-candidates";

export const getBoardCandidates = (
  board: string,
  exclude: { id: string; value: string }[] = []
) => {
  const allCandidates = { ...(getCandidates(board) || {}) };

  exclude.forEach(({ id, value }) => {
    if (!allCandidates[id]) return;
    allCandidates[id] = allCandidates[id]
      .split("")
      .filter((c) => c !== value)
      .join("");
  });

  return allCandidates;
};
