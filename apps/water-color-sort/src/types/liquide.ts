import { liquids } from "../constants";

const obj = { ...liquids } as const;
export type LiquideType = keyof typeof obj;

export type Liquide = {
  id: string;
  type: LiquideType;
};
