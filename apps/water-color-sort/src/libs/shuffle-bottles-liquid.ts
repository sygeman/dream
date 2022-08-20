import { liquids } from "../constants";
import { Bottle, Bottles } from "../types/bottle";
import { LiquideType } from "../types/liquide";
import { shuffle } from "../utils/shuffle";
import { getLastLiqudeWithSameType } from "./get-last-liqude-with-same-type";
import { transfuse } from "./transfuse";

const possibleToGet = (bottle: Bottle) => {
  const topColor = getLastLiqudeWithSameType(bottle);
  return topColor.size > 0 ? Array.from(topColor) : null;
};

const possibleToAdd = (bottle: Bottle) => {
  const topColor = getLastLiqudeWithSameType(bottle);
  if (topColor.size === 0) return Object.keys(liquids) as LiquideType[];
  if (topColor.size === 4) return null;
  return [Array.from(topColor)[0].type];
};

const shuffleBottlesLiquidNext = (bottles: Bottles) => {
  const bottlesData = Array.from(bottles.values()).map((bottle) => ({
    bottle,
    possibleToAdd: possibleToAdd(bottle),
    possibleToGet: possibleToGet(bottle),
  }));

  // Pick random bottle (b1) with possibleToGet !== null
  const bottlesForGet = bottlesData.filter(
    (bottleData) => bottleData.possibleToGet !== null
  );
  const bottleForGet = shuffle(bottlesForGet)?.[0];

  if (!bottleForGet) return false;

  // Find random bottle with possibleToAdd === b1.type
  const bottlesForAdd = bottlesData.filter(
    (bottleData) =>
      bottleData.possibleToAdd !== null &&
      // bottleData.possibleToAdd.includes(bottleForGet.possibleToGet),
      bottleData.bottle.id !== bottleForGet.bottle.id
  );
  const bottleForAdd = shuffle(bottlesForAdd)?.[0];

  if (!bottleForAdd) return false;

  console.log({ bottleForGet, bottleForAdd });

  const transfuseResult = transfuse(
    bottleForGet.bottle,
    bottleForAdd.bottle,
    true
  );

  if (!transfuseResult) return false;

  const [bottle1, bottle2] = transfuseResult;
  const newBottles = new Map(bottles);
  newBottles.set(bottle1.id, bottle1);
  newBottles.set(bottle2.id, bottle2);
  return newBottles;
};

export const shuffleBottlesLiquid = (bottles: Bottles, repeat = 10) => {
  let newBottles = new Map(bottles);

  // Repeat while it possible or some arg count
  for (let i = 0; i < repeat; i++) {
    const shuffleTry = shuffleBottlesLiquidNext(newBottles);
    if (!shuffleTry) break;
    newBottles = shuffleTry;
  }

  return newBottles;
};
