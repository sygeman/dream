import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Board } from "./components/board";
import { GamesNav } from "@/components/ui/games-nav";

export default function SudokuPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300 will-change-[background-color]">
      <AnimatedBackground />

      {/* Контент */}
      <div className="relative z-10">
        {/* Шапка */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-8">
            <div className="flex items-center gap-8">
              <Logo withBackground />
              <GamesNav />
            </div>
            <div className="relative">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient tracking-[0.05em] [text-shadow:_0_1px_12px_rgb(0_0_0_/_20%)] dark:[text-shadow:_0_1px_12px_rgb(255_255_255_/_20%)] transition-[background-image,text-shadow] duration-300 will-change-[background-image] mb-12">
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
