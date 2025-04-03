"use client";

import { useState, useMemo } from "react";
import { Control } from "./control";
import { Grid } from "./grid";
import { Cell } from "./cell";
import { BLANK_BOARD, BLANK_CHAR, ROWS, SQUARES } from "../utils/constants";
import {
  fillBoard,
  generateBoard,
  getIncludesCount,
  isProtected,
  setBoardValue,
  validateBoard,
} from "../utils/board";
import { NewGame } from "./new-game";
import { End } from "./end";

export function Game() {
  const [initBoard, setInitBoard] = useState(BLANK_BOARD);
  const [board, setBoard] = useState(BLANK_BOARD);
  const [selected, setSelected] = useState(SQUARES[0]);
  const [failures, setFailures] = useState(0);

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

  const newGame = () => {
    setInitBoard(BLANK_BOARD);
    reset();
  };

  const reset = () => {
    setBoard(initBoard);
    setSelected(SQUARES[0]);
    setFailures(0);
  };

  const setValue = (id: string, value: string) => {
    if (!value) return false;
    if (isProtected(initBoard, id)) return false;
    const newBoard = setBoardValue(board, id, value);
    if (!validateBoard(newBoard)) {
      setFailures((prev) => prev + 1);
    }
    setBoard(newBoard);
  };

  const setValueSelected = (value: string) => setValue(selected, value);

  const difficultyLabel = useMemo(() => {
    const difficulty = initBoard
      .split("")
      .filter((c) => c === BLANK_CHAR).length;
    if (difficulty > 40) return "Сложный";
    if (difficulty > 30) return "Средний";
    return "Легкий";
  }, [initBoard]);

  return (
    <div className="relative w-80 md:scale-150">
      {initBoard === BLANK_BOARD ? (
        <NewGame
          onSelect={(difficulty) => setInitBoard(generateBoard(difficulty))}
        />
      ) : (
        <div className="relative">
          <div className={solved ? "blur-sm" : ""}>
            <div className="relative">
              <div className="flex h-8 w-full items-end py-1 whitespace-nowrap">
                <div className="w-full">
                  <div className="px-1 max-w-fit uppercase text-sm font-medium bg-indigo-900 text-white/50 rounded-sm">
                    Судоку
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="px-2 py-0.5 text-xs font-medium bg-slate-800/50 text-gray-400 rounded"
                    onClick={newGame}
                  >
                    Новая игра
                  </button>
                  <button
                    className="px-2 py-0.5 text-xs font-medium bg-slate-800/50 text-gray-400 rounded"
                    onClick={reset}
                  >
                    Сброс
                  </button>
                </div>
              </div>

              <div className="flex justify-between font-medium text-xs py-0.5 text-gray-400">
                <div>{difficultyLabel}</div>
                <div>Ошибки: {failures}</div>
              </div>

              <Grid
                gap={2}
                renderCell={(mainRowIndex, mainCellIndex) => (
                  <Grid
                    gap={1}
                    renderCell={(innerRowIndex, innerCellIndex) => {
                      const rowIndex = innerRowIndex + mainRowIndex * 3;
                      const cellIndex = innerCellIndex + mainCellIndex * 3;
                      const id = `${ROWS[rowIndex]}${cellIndex + 1}`;
                      const value = board[SQUARES.indexOf(id)];
                      const isSelected = id === selected;
                      const isHighlightLine =
                        !isSelected &&
                        (id[0] === selected[0] || id[1] === selected[1]);
                      const isHighlightSame =
                        !isSelected &&
                        !isHighlightLine &&
                        value !== BLANK_CHAR &&
                        value === board[SQUARES.indexOf(selected)];
                      const isError = !validateBoard(board);

                      return (
                        <Cell
                          value={value === BLANK_CHAR ? "" : value}
                          selected={isSelected}
                          highlightLine={isHighlightLine}
                          highlightSame={isHighlightSame}
                          highlightError={isError}
                          notProtected={!isProtected(initBoard, id)}
                          onClick={() => setSelected(id)}
                        />
                      );
                    }}
                  />
                )}
              />

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
}
