/**
 * 3000 -> 3 000
 */
export const humanNumbers = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

/**
 * 3000 -> 3K
 */
export const shortNumbers = (value: number): string => {
  return value > 999 ? (value / 1000).toFixed(1) + 'K' : value.toString();
};
