export function cross(a: string, b: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result.push(a[i] + b[j]);
    }
  }
  return result;
}
