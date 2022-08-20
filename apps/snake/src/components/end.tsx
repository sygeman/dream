import { Component } from "solid-js";

export const End: Component<{ score: number; reset: () => void }> = (props) => (
  <div class="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-lime-800 text-white/50 font-medium">
    <div class="text-xl text-white">Nice try!</div>
    <div class="mt-1">Score: {props.score}</div>
    <button
      class="bg-lime-700 hover:bg-lime-600 text-white/80 rounded mt-2 px-2"
      onClick={() => props.reset()}
    >
      Retry
    </button>
  </div>
);
