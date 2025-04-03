import { Game } from "./components/game";

export default function SudokuPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-2xl font-bold">Судоку</h1>
      <Game />
    </div>
  );
}

export const revalidate = 0;
