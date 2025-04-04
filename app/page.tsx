import { GamepadIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { AnimatedBackground } from "@/components/ui/animated-background";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300 will-change-[background-color]">
      <AnimatedBackground />

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 md:gap-8 px-4 md:px-8">
        <Logo size="lg" href="/" />
        <div className="flex gap-4">
          <Link
            href="/games"
            className="bg-white/20 dark:bg-black/20 border-black/20 dark:border-white/20 hover:bg-white/40 dark:hover:bg-black/40 w-full md:w-auto max-w-[200px] backdrop-blur-sm text-black dark:text-white transition-[background-color,border-color,color] duration-300 will-change-[background-color,border-color,color] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border h-9 px-4 py-2"
          >
            <GamepadIcon className="size-4" /> Игры
          </Link>
        </div>
      </div>

      {/* Кнопка переключения темы */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <a
          href="https://github.com/sygeman/dream"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300"
        >
          <GithubIcon className="size-5" />
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}

export const revalidate = 0;
