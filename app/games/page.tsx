import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatedBackground } from "@/components/ui/animated-background";

const games = [
  {
    id: "tetris",
    title: "Тетрис",
    description: "Классическая игра-головоломка",
    link: "/games/tetris",
  },
  {
    id: "snake",
    title: "Змейка",
    description: "Легендарная аркадная игра",
    link: "/games/snake",
  },
  {
    id: "2048",
    title: "2048",
    description: "Популярная числовая головоломка",
    link: "/games/2048",
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
              <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient tracking-[0.05em] [text-shadow:_0_1px_12px_rgb(0_0_0_/_20%)] dark:[text-shadow:_0_1px_12px_rgb(255_255_255_/_20%)] transition-[background-image,text-shadow] duration-300 will-change-[background-image]">
                Игры
              </h1>
            </div>
            <div className="relative">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-4 py-8">
          {/* Сетка игр */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Link
                key={game.id}
                href={game.link}
                className="group relative overflow-hidden rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-black/20 dark:hover:border-white/20 p-6"
              >
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3 transition-colors duration-300">
                  {game.title}
                </h3>
                <p className="text-black/60 dark:text-white/60 transition-colors duration-300">
                  {game.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
