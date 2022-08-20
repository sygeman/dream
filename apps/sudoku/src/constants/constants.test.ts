import { assert, expect, test } from "vitest";
import { SQUARES, UNITS, SQUARE_UNITS, SQUARE_PEERS } from "./index";

test("squares size", () => {
  expect(SQUARES.length).toEqual(81);
});

test("units size", () => {
  expect(UNITS.length).toEqual(27);
});

test("units map size", () => {
  for (let i = 0; i < SQUARES.length; i++) {
    expect(SQUARE_UNITS[SQUARES[i]].length).toEqual(3);
  }
});

test("peers map size", () => {
  for (let i = 0; i < SQUARES.length; i++) {
    expect(SQUARE_PEERS[SQUARES[i]].length).toEqual(20);
  }
});

test("units map C2", () => {
  expect(SQUARE_UNITS["C2"]).toEqual([
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
    ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"],
    ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
  ]);
});

test("peers map C2", () => {
  expect(SQUARE_PEERS["C2"]).toEqual([
    "C1",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "A2",
    "B2",
    "D2",
    "E2",
    "F2",
    "G2",
    "H2",
    "I2",
    "A1",
    "A3",
    "B1",
    "B3",
  ]);
});
