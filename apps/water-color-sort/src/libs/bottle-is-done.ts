import { bottleSize } from "../constants";
import { Bottle } from "../types/bottle";

export const bottleIsDone = (bottle: Bottle) => {
  if (bottle.liquids.size === 0) return true;
  if (bottle.liquids.size !== bottleSize) return false;

  let isSameType = true;
  let lastType = "";

  for (const liquid of bottle.liquids.values()) {
    if (!lastType) {
      lastType = liquid.type;
      continue;
    }
    if (lastType !== liquid.type) {
      isSameType = false;
      break;
    }
  }

  return isSameType;
};
