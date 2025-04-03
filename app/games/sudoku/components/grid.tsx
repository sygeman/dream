"use client";

import { Cell } from "./cell";
import { SQUARES } from "../utils/constants";
import { SQUARE_PEERS } from "../utils/units";

interface GridProps {
  board: string;
  selectedCell: string | null;
  protectedCells: { [key: string]: boolean };
  errorCells: { [key: string]: boolean };
  onCellClick: (id: string) => void;
}

export function Grid({
  board,
  selectedCell,
  protectedCells,
  errorCells,
  onCellClick,
}: GridProps) {
  return (
    <div className="grid grid-cols-9 gap-px bg-neutral-800 p-px">
      {SQUARES.map((id) => {
        const index = SQUARES.indexOf(id);
        const value = board[index];
        const isSelected = selectedCell === id;
        const isProtected = protectedCells[id];
        const isError = errorCells[id];

        return (
          <Cell
            key={id}
            id={id}
            value={value}
            isSelected={isSelected}
            isProtected={isProtected}
            isError={isError}
            onClick={() => onCellClick(id)}
          />
        );
      })}
    </div>
  );
}
