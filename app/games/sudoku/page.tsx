import { Header } from "@/components/ui/header";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Board } from "./components/board";

export default function SudokuPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300 will-change-[background-color]">
      <AnimatedBackground />

      {/* Контент */}
      <div className="relative z-10">
        <Header />

        {/* Основной контент */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-12">
              Судоку
            </h1>
            <div className="w-full max-w-lg aspect-square bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl p-4">
              <Board />
            </div>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-300">
                Новая игра
              </button>
              <button className="px-6 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-300">
                Проверить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
