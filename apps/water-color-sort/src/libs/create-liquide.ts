import { nanoid } from "nanoid";
import { Liquide, LiquideType } from "../types/liquide";

export const createLiquide = (type: LiquideType): Liquide => ({
  id: nanoid(),
  type,
});
