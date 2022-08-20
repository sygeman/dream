import { isArrayIncludesArray } from "../utils/array";

export const positionIsValid = (snake: [number, number][]) => {
  const [head, ...tail] = snake;
  const [row, col] = head;
  const isOutbounds = row < 0 || row > 15 || col < 0 || col > 15;
  const isEatSelf = isArrayIncludesArray(tail, head);
  return !isOutbounds && !isEatSelf;
};
