import { Header } from "@/components/ui/header";
import { AnimatedBackground } from "@/components/ui/animated-background";
import Link from "next/link";

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
        <Header />

        {/* Основной контент */}
        <div className="container mx-auto px-4 py-8">
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
