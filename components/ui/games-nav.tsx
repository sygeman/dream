import Link from "next/link";

export const games = [
  {
    id: "sudoku",
    title: "Судоку",
    description: "Популярная головоломка с числами",
    link: "/games/sudoku",
  },
];

export function GamesNav() {
  return (
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
  );
}
