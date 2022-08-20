export function getIncludesCount(board: string) {
  const numIncludeCount: { [key: string]: number } = {};

  [...new Array(9)].forEach((_v, i) => {
    const v = `${i + 1}`;
    const count = (board.match(new RegExp(`${i + 1}`, "g")) || []).length;
    numIncludeCount[v] = count;
  });

  return numIncludeCount;
}
