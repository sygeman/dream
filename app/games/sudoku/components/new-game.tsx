"use client";

interface NewGameProps {
  onNewGame: (difficulty: number) => void;
}

export function NewGame({ onNewGame }: NewGameProps) {
  return (
    <div className="flex gap-2">
      <button
        className="rounded-lg bg-neutral-800 px-4 py-2 font-medium transition-colors hover:bg-neutral-700"
        onClick={() => onNewGame(30)}
      >
        Легкий
      </button>
      <button
        className="rounded-lg bg-neutral-800 px-4 py-2 font-medium transition-colors hover:bg-neutral-700"
        onClick={() => onNewGame(45)}
      >
        Средний
      </button>
      <button
        className="rounded-lg bg-neutral-800 px-4 py-2 font-medium transition-colors hover:bg-neutral-700"
        onClick={() => onNewGame(60)}
      >
        Сложный
      </button>
    </div>
  );
}
