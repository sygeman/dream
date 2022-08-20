import { SQUARES } from "../constants";
import { replaceAt } from "../utils/replace-at";

export const setBoardValue = (board: string, id: string, value: string) => {
  const indexById = SQUARES.findIndex((i) => i === id);
  return replaceAt(board, indexById, value);
};
