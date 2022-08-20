import { isArrayIncludesArray } from "./array";

export const exclude = (arr1: [number, number][], arr2: [number, number][]) => {
  return arr1.filter((col) => !isArrayIncludesArray(arr2, col));
};
