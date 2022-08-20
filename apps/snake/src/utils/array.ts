export const isArraysEqual = (
  arr1: [number, number] | null | undefined,
  arr2: [number, number] | null | undefined
) => {
  if (!arr1 || !arr2) return false;
  return arr1[0] == arr2[0] && arr1[1] === arr2[1];
};

export const isArrayIncludesArray = (
  arr: [number, number][] | null | undefined,
  target: [number, number] | null | undefined
) => {
  if (!arr || !target) return false;
  return !!arr.find((a) => isArraysEqual(a, target));
};
