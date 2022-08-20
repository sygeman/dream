import { bottleSize } from "../constants";
import { Bottle } from "../types/bottle";

export const bottleIsFull = (bottle: Bottle) =>
  bottle.liquids.size === bottleSize;
