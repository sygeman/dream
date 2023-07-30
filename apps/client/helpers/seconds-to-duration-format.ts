export const secondsToDurationFormat = (s: number) =>
  new Date(s * 1000).toISOString().substring(11, 8);
