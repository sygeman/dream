export function randomRange(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}
