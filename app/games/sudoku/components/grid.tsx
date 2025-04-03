"use client";

interface GridProps {
  gap?: number;
  renderCell: (rowIndex: number, cellIndex: number) => React.ReactNode;
}

export function Grid({ gap = 1, renderCell }: GridProps) {
  return (
    <div
      className={`grid grid-cols-3 ${
        gap === 1 ? "gap-0.5" : gap === 2 ? "gap-1" : ""
      }`}
    >
      {Array.from({ length: 3 }, (_, rowIndex) =>
        Array.from({ length: 3 }, (_, cellIndex) => (
          <div key={`${rowIndex}-${cellIndex}`}>
            {renderCell(rowIndex, cellIndex)}
          </div>
        ))
      )}
    </div>
  );
}
