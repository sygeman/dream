export function lastFrom<Type>([...arr]: Type[]) {
  if (arr.length === 0) return null;
  return arr[arr.length - 1];
}
