"use client";

import { useCallback, useEffect, useState } from "react";
import { Grid } from "./grid";
import { Controls } from "./controls";
import { NewGame } from "./new-game";
import { End } from "./end";
import { BLANK, SQUARES } from "../utils/constants";
import {
  generateBoard,
  getIncludesCount,
  isProtected,
  setBoardValue,
  validateBoard,
} from "../utils/board";

export function Game() {
  const [board, setBoard] = useState<string>("");
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [protectedCells, setProtectedCells] = useState<{
    [key: string]: boolean;
  }>({});
  const [errorCells, setErrorCells] = useState<{ [key: string]: boolean }>({});
  const [isComplete, setIsComplete] = useState(false);

  // Инициализация новой игры
  const initGame = useCallback((difficulty: number) => {
    const newBoard = generateBoard(difficulty);
    setBoard(newBoard);
    setSelectedCell(null);
    setSelectedValue(null);
    setIsComplete(false);

    // Определяем защищенные ячейки
    const protected_cells: { [key: string]: boolean } = {};
    SQUARES.forEach((square) => {
      protected_cells[square] = isProtected(newBoard, square);
    });
    setProtectedCells(protected_cells);

    // Сбрасываем ошибки
    const error_cells: { [key: string]: boolean } = {};
    SQUARES.forEach((square) => {
      error_cells[square] = false;
    });
    setErrorCells(error_cells);
  }, []);

  // Обработка клика по ячейке
  const handleCellClick = useCallback(
    (id: string) => {
      if (isComplete) return;
      setSelectedCell(id);
      if (selectedValue && !protectedCells[id]) {
        const newBoard = setBoardValue(board, id, selectedValue);
        if (validateBoard(newBoard)) {
          setBoard(newBoard);
          setErrorCells((prev) => ({ ...prev, [id]: false }));
          // Проверяем завершение игры
          if (!newBoard.includes(BLANK)) {
            setIsComplete(true);
          }
        } else {
          setErrorCells((prev) => ({ ...prev, [id]: true }));
        }
      }
    },
    [board, isComplete, protectedCells, selectedValue]
  );

  // Обработка выбора значения
  const handleValueSelect = useCallback(
    (value: string) => {
      if (isComplete) return;
      setSelectedValue(value);
      if (selectedCell && !protectedCells[selectedCell]) {
        const newBoard = setBoardValue(board, selectedCell, value);
        if (validateBoard(newBoard)) {
          setBoard(newBoard);
          setErrorCells((prev) => ({ ...prev, [selectedCell]: false }));
          // Проверяем завершение игры
          if (!newBoard.includes(BLANK)) {
            setIsComplete(true);
          }
        } else {
          setErrorCells((prev) => ({ ...prev, [selectedCell]: true }));
        }
      }
    },
    [board, isComplete, protectedCells, selectedCell]
  );

  // Инициализация игры при первой загрузке
  useEffect(() => {
    initGame(30);
  }, [initGame]);

  return (
    <div className="flex flex-col items-center gap-8">
      {!board ? (
        <NewGame onNewGame={initGame} />
      ) : (
        <>
          <Grid
            board={board}
            selectedCell={selectedCell}
            protectedCells={protectedCells}
            errorCells={errorCells}
            onCellClick={handleCellClick}
          />
          <Controls
            selectedValue={selectedValue}
            counts={getIncludesCount(board)}
            onValueSelect={handleValueSelect}
          />
          {isComplete && <End onNewGame={() => initGame(30)} />}
        </>
      )}
    </div>
  );
}
