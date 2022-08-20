import { Direction } from "../types/direction";

const directionTable: { [key: string]: [number, number] } = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

const getNewHead = (
  direction: Direction,
  [ox, oy]: [number, number]
): [number, number] => {
  const [x, y] = directionTable[direction];
  return [ox + x, oy + y];
};

export const moveSnake = (
  snake: [number, number][],
  direction: Direction,
  growth: boolean
) => {
  const size = growth ? snake.length + 1 : snake.length;
  const [oldHead, ...tail] = snake;
  const head = getNewHead(direction, oldHead);
  return [head, oldHead, ...tail].slice(0, size);
};
