import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export function Header() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center gap-8">
          <Logo withBackground href="/" />
          <Link
            href="/games"
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300"
          >
            Игры
          </Link>
        </div>
        <div className="relative">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
