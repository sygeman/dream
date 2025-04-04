import { expect, test } from "vitest";
import { BLANK_BOARD } from "../constants";
import { setBoardValue } from "./set-board-value";

test("set board value", () => {
  expect(setBoardValue(BLANK_BOARD, "A2", "2")[1]).toEqual("2");
});
