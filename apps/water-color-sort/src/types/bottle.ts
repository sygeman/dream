import { Liquide } from "./liquide";

export type Bottle = {
  id: string;
  liquids: Set<Liquide>;
};

export type Bottles = Map<string, Bottle>;
