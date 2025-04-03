import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatedBackground } from "@/components/ui/animated-background";

const games = [
  {
    id: "sudoku",
    title: "Судоку",
    description: "Популярная головоломка с числами",
    link: "/games/sudoku",
  },
];

export default function GamesPage() {
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
              <div className="flex items-center gap-4">
                {games.map((game) => (
                  <Link
                    key={game.id}
                    href={game.link}
                    className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300"
                  >
                    {game.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient tracking-[0.05em] [text-shadow:_0_1px_12px_rgb(0_0_0_/_20%)] dark:[text-shadow:_0_1px_12px_rgb(255_255_255_/_20%)] transition-[background-image,text-shadow] duration-300 will-change-[background-image] mb-8">
              Игры
            </h1>
            <p className="text-xl text-black/60 dark:text-white/60 text-center max-w-2xl">
              Коллекция классических игр с современным дизайном
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
