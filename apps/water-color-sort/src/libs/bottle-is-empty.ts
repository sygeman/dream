import { Bottle } from "../types/bottle";

export const bottleIsEmpty = (bottle: Bottle) => bottle.liquids.size === 0;
