import { liquids } from "../constants";
import { Bottles } from "../types/bottle";
import { LiquideType } from "../types/liquide";
import { shuffle } from "../utils/shuffle";
import { createBottle } from "./create-bottle";
import { createLiquide } from "./create-liquide";
import { shuffleBottlesLiquid } from "./shuffle-bottles-liquid";

export const generateBottles = (fullCount: number, emptyCount: number = 2) => {
  const bottles: Bottles = new Map();
  const colorsCount = fullCount - emptyCount;

  if (colorsCount <= 0) throw "Invalid count";

  const colors = shuffle(Object.keys(liquids)).slice(0, colorsCount);

  const input: LiquideType[][] = [
    ...colors.map((color) => Array(4).fill(color)),
    ...Array(emptyCount).fill([]),
  ];

  input.forEach((liqs) => {
    const bottle = createBottle(new Set(liqs.reverse().map(createLiquide)));
    bottles.set(bottle.id, bottle);
  });

  return shuffleBottlesLiquid(bottles);
};
