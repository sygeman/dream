import { Button } from "@/components/ui/button";
import { GamepadIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300 will-change-[background-color]">
      {/* Футуристический фон */}
      <div className="absolute inset-0">
        {/* Основной градиент */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 opacity-60 dark:opacity-40 mix-blend-overlay animate-color-pulse transition-[background-image,opacity] duration-300 will-change-[background-image,opacity]" />

        {/* Дополнительные градиенты */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/40 via-transparent to-transparent dark:from-cyan-500/40 animate-gradient transition-[background-image] duration-300 will-change-[background-image]" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-indigo-300/40 via-transparent to-transparent dark:from-indigo-500/40 animate-gradient transition-[background-image] duration-300 will-change-[background-image]"
          style={{ animationDelay: "-3s" }}
        />

        {/* Виньетка */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)] transition-[background-image] duration-300 will-change-[background-image]" />

        {/* Анимированные линии */}
        <div className="absolute w-full h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-black/10 dark:bg-white/20 w-[1px] md:w-[2px] h-[10vh] md:h-[20vh] animate-pulse-custom transition-colors duration-300 will-change-[background-color]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * -5}s`,
              }}
            />
          ))}
        </div>

        {/* Светящиеся точки */}
        <div className="absolute w-full h-full">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`dot-${i}`}
              className="absolute rounded-full bg-black/60 dark:bg-white/80 blur-[1px] animate-float transition-colors duration-300 will-change-[background-color]"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * -8}s`,
                animationDuration: `${8 + Math.random() * 7}s`,
              }}
            />
          ))}
        </div>

        {/* Мерцающие звезды */}
        <div className="absolute w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-black/80 dark:bg-white animate-sparkle transition-colors duration-300 will-change-[background-color]"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * -2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 md:gap-8 px-4 md:px-8">
        <h1 className="text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient text-center tracking-wider [text-shadow:_0_1px_12px_rgb(0_0_0_/_20%)] dark:[text-shadow:_0_1px_12px_rgb(255_255_255_/_20%)] transition-[background-image,text-shadow] duration-300 will-change-[background-image]">
          SGMN.DEV
        </h1>
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
