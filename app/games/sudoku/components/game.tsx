"use client";

import { FC, useCallback, useMemo, useState, useEffect } from "react";
import clsx from "clsx";
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
import { useShortcut } from "../shortcut";
import { End } from "./end";
import { generateBoard } from "../libs/generate-board";
import { NewGame } from "./new-game";

export const getDifficulty = (initBoard: string) => {
  const difficulty = initBoard.split("").filter((c) => c === BLANK_CHAR).length;
  if (difficulty > DIFFICULTY.medium) return "Сложно";
  if (difficulty > DIFFICULTY.easy) return "Средне";
  return "Легко";
};

export const Game: FC = () => {
  const [initBoard, setInitBoard] = useState(BLANK_BOARD);
  const [board, setBoard] = useState(BLANK_BOARD);
  const [selected, setSelected] = useState(SQUARES[0]);
  const [failures, setFailures] = useState(0);

  // Синхронизация board с initBoard
  useEffect(() => {
    setBoard(initBoard);
  }, [initBoard]);

  const { boardData } = useBoardData(initBoard, board, selected);

  const solution = useMemo(
    () => (initBoard === BLANK_BOARD ? BLANK_BOARD : fillBoard(initBoard)),
    [initBoard]
  );

  const solved = useMemo(
    () => board !== BLANK_BOARD && board === solution,
    [board, solution]
  );

  const selectedIsProtected = useMemo(
    () => isProtected(initBoard, selected),
    [initBoard, selected]
  );

  const includesCount = useMemo(() => getIncludesCount(board), [board]);

  const newGame = useCallback(() => {
    setInitBoard(BLANK_BOARD);
    reset();
  }, []);

  const reset = useCallback(() => {
    setBoard(initBoard);
    setSelected(SQUARES[0]);
    setFailures(0);
  }, [initBoard]);

  const setValue = useCallback(
    (id: string, value: string) => {
      if (!value) return false;
      if (isProtected(initBoard, id)) return false;
      const newBoard = setBoardValue(board, id, value);
      if (!validateBoard(newBoard)) {
        setFailures((prev: number) => prev + 1);
      }
      setBoard(newBoard);
    },
    [board, initBoard]
  );

  const setValueSelected = useCallback(
    (value: string) => setValue(selected, value),
    [selected, setValue]
  );

  const difficultyLabel = useMemo(() => getDifficulty(initBoard), [initBoard]);

  useShortcut({ selected, select: setSelected, setValueSelected });

  return (
    <div className="w-full h-full">
      {initBoard === BLANK_BOARD ? (
        <NewGame
          onSelect={(difficulty) => setInitBoard(generateBoard(difficulty))}
        />
      ) : (
        <div className="relative w-full h-full flex flex-col">
          <div
            className={clsx("relative flex-1", {
              "blur-sm": solved,
            })}
          >
            <div className="relative h-full flex flex-col">
              <div className="flex items-center justify-between py-2 sm:py-3 whitespace-nowrap">
                <div className="px-2 sm:px-3 py-1 uppercase text-base sm:text-lg md:text-xl font-medium bg-indigo-900 text-white/80 rounded-md">
                  Судоку
                </div>
                <div className="flex gap-2">
                  <HeaderButton onClick={newGame} size="lg">
                    Новая игра
                  </HeaderButton>
                  <HeaderButton onClick={reset} size="lg">
                    Сброс
                  </HeaderButton>
                </div>
              </div>

              <div className="flex justify-between font-medium text-xs py-0.5 text-gray-400">
                <div>{difficultyLabel}</div>
                <div>Ошибок: {failures}</div>
              </div>

              <div className="flex-1 aspect-square">
                <X3Grid
                  gap={2}
                  renderCell={(mainRowIndex, mainCellIndex) => (
                    <X3Grid
                      gap={1}
                      renderCell={(innerRowIndex, innerCellIndex) => {
                        const rowIndex = innerRowIndex + mainRowIndex * 3;
                        const cellIndex = innerCellIndex + mainCellIndex * 3;
                        const id = `${ROWS[rowIndex]}${cellIndex + 1}`;
                        const cellData = boardData[id];

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
                            onClick={() => setSelected(id)}
                          />
                        );
                      }}
                    />
                  )}
                />
              </div>

              <div className="mt-4">
                <Control
                  includesCount={includesCount}
                  selectedIsProtected={selectedIsProtected}
                  setValueSelected={setValueSelected}
                />
              </div>
            </div>
          </div>
          {solved && (
            <End failures={failures} newGame={newGame} reset={reset} />
          )}
        </div>
      )}
    </div>
  );
};
