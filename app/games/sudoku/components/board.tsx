"use client";

import { useState } from "react";

interface BoardProps {
  initialBoard?: number[][];
}

export function Board({ initialBoard }: BoardProps) {
  const [board, setBoard] = useState<number[][]>(
    initialBoard || Array(9).fill(Array(9).fill(0))
  );

  const handleCellChange = (row: number, col: number, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 9) return;

    const newBoard = board.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? numValue : c)) : r
    );
    setBoard(newBoard);
  };

  return (
    <div className="grid grid-cols-9 gap-px bg-black/20 dark:bg-white/20 p-px rounded-lg">
      {board.map((row, i) =>
        row.map((cell, j) => (
          <input
            key={`${i}-${j}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={cell === 0 ? "" : cell}
            onChange={(e) => handleCellChange(i, j, e.target.value)}
            className={`w-full aspect-square text-center text-lg font-medium bg-white dark:bg-black text-black dark:text-white 
              ${
                (i + 1) % 3 === 0 && i < 8
                  ? "border-b border-black/20 dark:border-white/20"
                  : ""
              }
              ${
                (j + 1) % 3 === 0 && j < 8
                  ? "border-r border-black/20 dark:border-white/20"
                  : ""
              }
              focus:outline-none focus:bg-white/90 dark:focus:bg-black/90 transition-colors duration-300`}
          />
        ))
      )}
    </div>
  );
}
