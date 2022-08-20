export function cross(a: string, b: string) {
  let result = [];
  for (let ai = 0; ai < a.length; ai++) {
    for (let bi = 0; bi < b.length; bi++) {
      result.push(a[ai] + b[bi]);
    }
  }
  return result;
}
