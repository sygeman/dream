import { createShortcut } from '@solid-primitives/keyboard';
import {
  For,
  Show,
  Component,
  createSignal,
  onCleanup,
  createMemo,
} from 'solid-js';
import { End } from './end';
import { shuffle } from '../utils/shuffle';
import { Direction } from '../types/direction';
import { matrixAsArray } from '../libs/matrix';
import { moveSnake } from '../libs/move-snake';
import { isArrayIncludesArray, isArraysEqual } from '../utils/array';
import { exclude } from '../utils/exclude';
import { positionIsValid } from '../libs/position-is-valid';
import { directionIsValid } from '../libs/direction-is-valid';

const Game: Component = () => {
  const [fail, setFail] = createSignal<boolean>(false);
  const [score, setScore] = createSignal<number>(0);
  const [apple, setApple] = createSignal<[number, number] | null>();
  const [snake, setSnake] = createSignal<[number, number][]>([[7, 7]]);
  const [direction, setDirection] = createSignal<Direction>('none');
  const [lastDirection, setLastDirection] = createSignal<Direction>('none');

  const snakeHead = createMemo(() => snake()[0]);

  const changeDirection = (newDirection: Direction) => {
    if (directionIsValid(lastDirection(), newDirection)) {
      setDirection(newDirection);
    }
  };

  createShortcut(['ArrowUp'], () => changeDirection('up'));
  createShortcut(['ArrowDown'], () => changeDirection('down'));
  createShortcut(['ArrowLeft'], () => changeDirection('left'));
  createShortcut(['ArrowRight'], () => changeDirection('right'));

  const reset = () => {
    setDirection('none');
    setApple(null);
    setSnake([[5, 5]]);
    setFail(false);
  };

  const addApple = () => {
    const candidates = shuffle(exclude(matrixAsArray, snake()));
    setApple(candidates[0]);
  };

  const move = (direction: Direction) => {
    if (direction === 'none') return;

    const isEat = isArraysEqual(apple(), snakeHead());

    setSnake((prev) => {
      const newSnake = moveSnake(prev, direction, isEat);
      if (positionIsValid(newSnake)) return newSnake;
      setFail(true);
      return prev;
    });

    if (isEat) {
      setScore((prev) => prev + 1);
      addApple();
    }

    setLastDirection(direction);
  };

  const getCellClass = (cell: [number, number]) => {
    if (isArrayIncludesArray(snake(), cell)) {
      if (isArraysEqual(snakeHead(), cell)) return 'bg-lime-500 rounded-sm';
      return 'bg-lime-600 rounded-sm';
    }
    if (isArraysEqual(apple(), cell)) return 'bg-red-500/90 rounded-lg';
    return 'bg-lime-700';
  };

  const interval = setInterval(() => {
    if (!apple()) addApple();
    if (!fail()) move(direction());
  }, 300);

  onCleanup(() => clearInterval(interval));

  return (
    <div class="bg-lime-900 h-screen w-screen absolute inset-0 flex items-center justify-center">
      <a
        class="absolute right-4 top-2 text-white/50 font-medium"
        target="blank"
        href="https://github.com/sygeman/dream/tree/main/apps/snake"
      >
        Github
      </a>
      <div class="w-80 scale-150 relative rounded overflow-hidden">
        <div class="flex w-full justify-between text-white/50">
          <div>Snake</div>
          <div>{score()}</div>
        </div>
        <div class="w-80 h-80 bg-lime-700 flex flex-wrap">
          <For each={matrixAsArray}>
            {(cell) => (
              <div class={`w-5 h-5 flex relative ${getCellClass(cell)}`} />
            )}
          </For>
          <Show when={fail()}>
            <End score={score()} reset={reset} />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Game;
