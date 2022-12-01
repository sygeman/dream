/**
 * 3000 -> 3 000
 */
export const humanNumbers = (value: number, separator = ' '): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * 3000 -> 3K
 */
export const shortNumbers = (value: number): string => {
  let tmpValue = value;

  if (value < 0) {
    tmpValue = value * -1;
  }

  let result =
    tmpValue > 9999
      ? (tmpValue / 1000).toFixed(1) + 'K'
      : humanNumbers(tmpValue);

  if (value < 0) {
    result = `-${result}`;
  }

  return result;
};
