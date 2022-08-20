import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
} from "solid-js";
import { liquids } from "../constants";
import { bottleIsDone } from "../libs/bottle-is-done";
import { bottleIsEmpty } from "../libs/bottle-is-empty";
import { bottlesIsDone } from "../libs/bottles-is-done";
import { generateBottles } from "../libs/generate-bottles";
import { transfuse } from "../libs/transfuse";
import { Bottle } from "../types/bottle";

const Game: Component = () => {
  const [bottles, setBottles] = createSignal<Map<string, Bottle>>(
    generateBottles(7)
  );
  const [selected, setSelected] = createSignal<string | null>(null);

  const bottlesArray = createMemo(() => [...bottles().values()]);

  const reset = () => {
    setBottles(generateBottles(7));
    setSelected(null);
  };

  createEffect(() => {
    const allBottlesIsDone = bottlesIsDone(bottles());
    if (allBottlesIsDone) {
      // reset();
    }
  });

  const select = (id: string) => {
    const bottle = bottles().get(id);
    if (!bottle || (bottleIsEmpty(bottle) && !selected())) return false;

    setSelected((prevId) => {
      if (prevId === id) return null;
      if (!prevId) return id;

      const prevBottle = bottles().get(prevId);
      const transfuseResult = transfuse(prevBottle, bottle);

      if (transfuseResult) {
        const [bottle1, bottle2] = transfuseResult;
        // Set bottles
        setBottles((prevBottles) => {
          const newBottles = new Map(prevBottles);
          newBottles.set(bottle1.id, bottle1);
          newBottles.set(bottle2.id, bottle2);
          return newBottles;
        });
      }

      return null;
    });
  };

  return (
    <div class="bg-slate-900 h-screen w-screen absolute inset-0 flex items-center justify-center">
      <a
        class="absolute right-4 top-2 text-white/50 font-medium"
        target="blank"
        href="https://github.com/sygeman/water-color-sort"
      >
        Github
      </a>
      <div class="w-80 md:scale-150 relative rounded overflow-hidden">
        <div class="flex w-full justify-between text-white/50">
          <div>Water Color Sort</div>
          <button onClick={reset}>Reset</button>
        </div>
        <div class="w-80 h-80 bg-slate-800 flex flex-wrap justify-center items-center gap-6 px-14">
          <For each={bottlesArray()}>
            {(bottle) => (
              <button
                class={`flex flex-col-reverse w-6 h-32 bg-white/20 rounded overflow-hidden transition-transform ${
                  bottle.id === selected() ? "scale-110" : ""
                }`}
                onClick={() => select(bottle.id)}
              >
                <For each={[...bottle.liquids.values()]}>
                  {(liquide) => (
                    <div class={`h-8 w-6 ${liquids[liquide.type]}`} />
                  )}
                </For>
              </button>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Game;
