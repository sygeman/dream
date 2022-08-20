import { Bottle } from "../types/bottle";
import { bottleIsDone } from "./bottle-is-done";

export const bottlesIsDone = (bottles: Map<string, Bottle>) => {
  let allBottlesIsDone = true;

  for (const bottle of Array.from(bottles.values())) {
    if (!bottleIsDone(bottle)) {
      allBottlesIsDone = false;
      break;
    }
  }

  return allBottlesIsDone;
};
