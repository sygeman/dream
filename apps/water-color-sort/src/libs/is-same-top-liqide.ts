import { Bottle } from "../types/bottle";
import { lastFrom } from "../utils/last-from";

export const isSameTopLiqide = (fromBottle?: Bottle, toBottle?: Bottle) => {
  if (!fromBottle || !toBottle) return false;
  const fromLiquide = lastFrom(Array.from(fromBottle.liquids))?.type;
  const toLiquide = lastFrom(Array.from(toBottle.liquids))?.type;
  return fromLiquide === toLiquide || !toLiquide;
};
