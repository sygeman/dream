import { nanoid } from "nanoid";
import { Bottle } from "../types/bottle";
import { Liquide } from "../types/liquide";

export const createBottle = (liquids: Set<Liquide> = new Set()): Bottle => ({
  id: nanoid(),
  liquids,
});
