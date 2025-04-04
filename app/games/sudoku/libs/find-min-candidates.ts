import { shuffle } from "../utils/shuffle";

export const findMinCandidates = (cellGroup: Map<number, Set<string>>) => {
  if (cellGroup.size === 0) return null;

  const group = cellGroup.values().next().value as Set<string>;
  const groupAsArray = Array.from(group);

  return shuffle(groupAsArray)[0] || null;
};
