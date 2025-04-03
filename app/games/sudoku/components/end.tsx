"use client";

interface EndProps {
  onNewGame: () => void;
}

export function End({ onNewGame }: EndProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Поздравляем!</h2>
      <p className="text-neutral-400">Вы успешно решили судоку</p>
      <button
        className="rounded-lg bg-neutral-800 px-4 py-2 font-medium transition-colors hover:bg-neutral-700"
        onClick={onNewGame}
      >
        Новая игра
      </button>
    </div>
  );
}
