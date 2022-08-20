import { Component, JSX } from "solid-js";

const x3Array = [...new Array(3)];

export const X3Grid: Component<{
  renderCell: (rowIndex: number, cellIndex: number) => JSX.Element;
  gap?: 1 | 2;
}> = (props) => (
  <div
    classList={{
      "grid grid-cols-3": true,
      "gap-0.5": props.gap === 1,
      "gap-1.5": props.gap !== 1,
    }}
  >
    {x3Array.map((_row, x3RowIndex) =>
      x3Array.map((_cell, x3CellIndex) => (
        <>{props.renderCell(x3RowIndex, x3CellIndex)}</>
      ))
    )}
  </div>
);
