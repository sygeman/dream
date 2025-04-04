import { FC, ReactNode } from "react";
import clsx from "clsx";

const x3Array = [...new Array(3)];

interface X3GridProps {
  renderCell: (rowIndex: number, cellIndex: number) => ReactNode;
  gap?: 1 | 2;
}

export const X3Grid: FC<X3GridProps> = (props) => (
  <div
    className={clsx(
      "grid grid-cols-3",
      props.gap === 1 ? "gap-0.5" : "gap-1.5"
    )}
  >
    {x3Array.map((_row, x3RowIndex) =>
      x3Array.map((_cell, x3CellIndex) => (
        <div key={`${x3RowIndex}-${x3CellIndex}`}>
          {props.renderCell(x3RowIndex, x3CellIndex)}
        </div>
      ))
    )}
  </div>
);
