import { Button } from "@/components/ui/button";
import { GamepadIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Футуристический фон */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 w-[1px] h-[20vh] md:h-[20vh] h-[10vh]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `pulse ${5 + Math.random() * 5}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 md:gap-8 px-4 md:px-8">
        <h1 className="text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient text-center tracking-wider">
          SGMN.DEV
        </h1>
        <Button
          asChild
          variant="outline"
          className="bg-black/20 border-white/20 hover:bg-black/40 w-full md:w-auto max-w-[200px]"
        >
          <Link href="/games" className="text-white">
            <GamepadIcon className="size-4 mr-2" /> Игры
          </Link>
        </Button>
      </div>
    </div>
  );
}

export const revalidate = 0;
