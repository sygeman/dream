import { Direction } from "../types/direction";

export const directionIsValid = (
  direction: Direction,
  newDirection: Direction
) => {
  if (direction === "up" && newDirection === "down") return false;
  if (direction === "down" && newDirection === "up") return false;
  if (direction === "left" && newDirection === "right") return false;
  if (direction === "right" && newDirection === "left") return false;
  return true;
};
