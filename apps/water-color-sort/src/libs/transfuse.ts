import { bottleSize } from "../constants";
import { Bottle } from "../types/bottle";
import { lastFrom } from "../utils/last-from";
import { bottleIsEmpty } from "./bottle-is-empty";
import { bottleIsFull } from "./bottle-is-full";
import { getLastLiqudeWithSameType } from "./get-last-liqude-with-same-type";
import { isSameTopLiqide } from "./is-same-top-liqide";

export const transfuse = (
  fromBottle?: Bottle,
  toBottle?: Bottle,
  takeOnlyOneLiqudePart = false
) => {
  if (!fromBottle || !toBottle) return false;
  if (bottleIsEmpty(fromBottle)) return false;
  if (bottleIsFull(toBottle)) return false;
  if (!isSameTopLiqide(fromBottle, toBottle)) return false;

  const bottle1 = { ...fromBottle };
  const bottle2 = { ...toBottle };

  const liquide = lastFrom(Array.from(fromBottle.liquids));
  if (!liquide) return false;

  const liquids = Array.from(getLastLiqudeWithSameType(fromBottle));
  const spaceLeft = takeOnlyOneLiqudePart
    ? 1
    : bottleSize - toBottle.liquids.size;

  liquids.slice(0, spaceLeft).forEach((liquide) => {
    bottle1.liquids.delete(liquide);
    bottle2.liquids.add(liquide);
  });

  return [bottle1, bottle2];
};
