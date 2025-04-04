import { createEffect, createMemo, createSignal } from "solid-js";
import { Control } from "./control";
import { X3Grid } from "./x3-grid";
import { Cell } from "./cell";
import { BLANK_BOARD, BLANK_CHAR, ROWS, SQUARES } from "../constants";
import { HeaderButton } from "./header-button";
import { DIFFICULTY } from "../constants";
import { fillBoard } from "../libs/fill-board";
import { useBoardData } from "../hooks/board-data";
import { isProtected } from "../libs/is-protected";
import { getIncludesCount } from "../libs/get-includes-count";
import { setBoardValue } from "../libs/set-board-value";
import { validateBoard } from "../libs/validate-board";
import { shortcut } from "../shortcut";
import { End } from "./end";
import { Layout } from "./layout";
import { generateBoard } from "../libs/generate-board";
import { NewGame } from "./new-game";

export const getDifficulty = (initBoard: string) => {
  const difficulty = initBoard.split("").filter((c) => c === BLANK_CHAR).length;
  if (difficulty > DIFFICULTY.medium) return "Hard";
  if (difficulty > DIFFICULTY.easy) return "Medium";
  return "Easy";
};

export const Game = () => {
  const [initBoard, setInitBoard] = createSignal(BLANK_BOARD);
  const [board, setBoard] = createSignal(BLANK_BOARD);
  const [selected, select] = createSignal(SQUARES[0]);
  const [failures, setFailures] = createSignal(0);

  createEffect(() => {
    setBoard(initBoard());
  });

  const { boardData } = useBoardData(initBoard, board, selected);

  const solution = createMemo(() =>
    initBoard() === BLANK_BOARD ? BLANK_BOARD : fillBoard(initBoard())
  );
  const soloved = createMemo(
    () => board() !== BLANK_BOARD && board() === solution()
  );
  const selectedIsProtected = createMemo(() =>
    isProtected(initBoard(), selected())
  );
  const includesCount = createMemo(() => getIncludesCount(board()));

  const newGame = () => {
    setInitBoard(BLANK_BOARD);
    reset();
  };

  const reset = () => {
    setBoard(initBoard());
    select(SQUARES[0]);
    setFailures(0);
  };

  const setValue = (id: string, value: string) => {
    if (!value) return false;
    if (isProtected(initBoard(), id)) return false;
    const newBoard = setBoardValue(board(), id, value);
    if (!validateBoard(newBoard)) {
      setFailures((prev) => prev + 1);
    }
    setBoard(newBoard);
  };

  const setValueSelected = (value: string) => setValue(selected(), value);

  const difficultyLabel = createMemo(() => getDifficulty(initBoard()));

  shortcut({ selected, select, setValueSelected });

  return (
    <Layout>
      {initBoard() === BLANK_BOARD ? (
        <NewGame
          onSelect={(difficulty) => setInitBoard(generateBoard(difficulty))}
        />
      ) : (
        <div class="relative w-80 md:scale-150">
          <div
            classList={{
              relative: true,
              "blur-sm": soloved(),
            }}
          >
            <div class="relative">
              <div class="flex h-8 w-full items-end py-1 whitespace-nowrap">
                <div class="w-full">
                  <div class="px-1 max-w-fit uppercase text-sm font-medium bg-indigo-900 text-white/50 rounded-sm">
                    Sudoku
                  </div>
                </div>
                <div class="flex gap-1">
                  <HeaderButton onClick={newGame}>New Game</HeaderButton>
                  <HeaderButton onClick={reset}>Reset</HeaderButton>
                </div>
              </div>

              <div class="flex justify-between font-medium text-xs py-0.5 text-gray-400">
                <div>{difficultyLabel()}</div>
                <div>Failures: {failures()}</div>
              </div>

              <X3Grid
                gap={2}
                renderCell={(mainRowIndex, mainCellIndex) => (
                  <X3Grid
                    gap={1}
                    renderCell={(innerRowIndex, innerCellIndex) => {
                      const rowIndex = innerRowIndex + mainRowIndex * 3;
                      const cellIndex = innerCellIndex + mainCellIndex * 3;
                      const id = `${ROWS[rowIndex]}${cellIndex + 1}`;
                      const cellData = boardData()[id];

                      const cellSelected = cellData.selected;
                      const cellHighlightLine = cellData.selectedLine;
                      const cellHighlightSame = cellData.selectedSame;
                      const value = cellData.value;

                      return (
                        <Cell
                          value={value === BLANK_CHAR ? "" : value}
                          selected={cellSelected}
                          highlightLine={cellHighlightLine}
                          highlightSame={cellHighlightSame}
                          highlightError={cellData.error}
                          notProtected={!cellData.protected}
                          onClick={() => select(id)}
                        />
                      );
                    }}
                  />
                )}
              />

              <div class="mt-4">
                <Control
                  includesCount={includesCount()}
                  selectedIsProtected={selectedIsProtected()}
                  setValueSelected={setValueSelected}
                />
              </div>
            </div>
          </div>
          {soloved() && (
            <End failures={failures()} newGame={newGame} reset={reset} />
          )}
        </div>
      )}
    </Layout>
  );
};
