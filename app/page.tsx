import { Button } from "@/components/ui/button";
import { GamepadIcon } from "lucide-react";
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
        <Logo size="lg" />
        <div className="flex gap-4">
          <Button
            asChild
            variant="outline"
            className="bg-white/20 dark:bg-black/20 border-black/20 dark:border-white/20 hover:bg-white/40 dark:hover:bg-black/40 w-full md:w-auto max-w-[200px] backdrop-blur-sm text-black dark:text-white transition-[background-color,border-color,color] duration-300 will-change-[background-color,border-color,color]"
          >
            <Link href="/games">
              <GamepadIcon className="size-4 mr-2" /> Игры
            </Link>
          </Button>
        </div>
      </div>

      {/* Кнопка переключения темы */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}

export const revalidate = 0;
