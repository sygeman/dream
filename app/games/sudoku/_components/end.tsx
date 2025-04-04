import { Component } from "solid-js";
import { HeaderButton } from "./header-button";

export const End: Component<{
  failures: number;
  newGame: () => void;
  reset: () => void;
}> = (props) => (
  <div class="absolute inset-0 w-full h-full flex items-center">
    <div
      classList={{
        "flex flex-col justify-center items-center": true,
        "w-full py-4 bg-indigo-900/80": true,
      }}
    >
      <div class="font-medium">Awesome!</div>
      <div class="font-medium text-xs text-gray-400">
        Failures: {props.failures}
      </div>
      <div class="flex gap-1 mt-2">
        <HeaderButton onClick={props.newGame}>New Game</HeaderButton>
        <HeaderButton onClick={props.reset}>Again</HeaderButton>
      </div>
    </div>
  </div>
);
