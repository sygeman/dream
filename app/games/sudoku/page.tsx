import { Header } from "@/components/ui/header";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Game } from "./components/game";

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
            <div className="w-full max-w-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl p-4">
              <Game />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
