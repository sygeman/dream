import { expect, test } from "vitest";

import { cross } from "./cross";

test("cross", () => {
  expect(cross("abc", "123")).toEqual([
    "a1",
    "a2",
    "a3",
    "b1",
    "b2",
    "b3",
    "c1",
    "c2",
    "c3",
  ]);
});
