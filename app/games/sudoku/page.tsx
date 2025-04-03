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
            <h1 className="text-4xl font-bold text-black dark:text-white mb-12">
              Судоку
            </h1>
            <Game />
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
