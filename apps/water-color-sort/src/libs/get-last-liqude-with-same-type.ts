import { Bottle } from "../types/bottle";
import { Liquide } from "../types/liquide";

export const getLastLiqudeWithSameType = (bottle: Bottle) => {
  const liquids = Array.from(bottle.liquids).reverse();
  const container: Set<Liquide> = new Set();
  let type = "";

  for (const liquid of liquids) {
    if (type && type !== liquid.type) break;

    container.add(liquid);
    type = liquid.type;
  }

  return container;
};
