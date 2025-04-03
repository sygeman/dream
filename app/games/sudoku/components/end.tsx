"use client";

interface EndProps {
  failures: number;
  newGame: () => void;
  reset: () => void;
}

export function End({ failures, newGame, reset }: EndProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col gap-4 p-6 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10">
        <h2 className="text-2xl font-bold text-center text-white/50">
          Поздравляем!
        </h2>
        <p className="text-center text-white/50">
          Вы решили судоку с {failures} ошибками
        </p>
        <div className="flex gap-2">
          <button
            className="px-6 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-300"
            onClick={newGame}
          >
            Новая игра
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-300"
            onClick={reset}
          >
            Начать заново
          </button>
        </div>
      </div>
    </div>
  );
}
