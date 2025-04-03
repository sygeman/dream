"use client";

interface NewGameProps {
  onSelect: (difficulty: number) => void;
}

export function NewGame({ onSelect }: NewGameProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center text-white/50">
        Выберите сложность
      </h2>
      <div className="flex flex-col gap-2">
        <button
          className="px-6 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-300"
          onClick={() => onSelect(30)}
        >
          Легкий
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-300"
          onClick={() => onSelect(40)}
        >
          Средний
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-300"
          onClick={() => onSelect(50)}
        >
          Сложный
        </button>
      </div>
    </div>
  );
}
