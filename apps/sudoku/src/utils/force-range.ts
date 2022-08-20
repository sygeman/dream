/* Force `nr` to be within the range from `min` to, but not including, 
`max`. `min` is optional, and will default to 0. If `nr` is undefined,
treat it as zero. */
export function forceRange(nr = 0, max: number, min = 0) {
  if (nr < min) return min;
  if (nr > max) return max;
  return nr;
}
