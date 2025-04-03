import Link from "next/link";

interface LogoProps {
  size?: "sm" | "lg";
  withBackground?: boolean;
}

export function Logo({ size = "sm", withBackground = false }: LogoProps) {
  const text = (
    <span
      className={cn(
        "font-logo font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient tracking-[0.05em] [text-shadow:_0_1px_12px_rgb(0_0_0_/_20%),_0_0_2px_rgb(0_0_0_/_40%)] dark:[text-shadow:_0_1px_12px_rgb(255_255_255_/_20%),_0_0_2px_rgb(255_255_255_/_40%)] transition-[background-image,text-shadow] duration-300 will-change-[background-image] relative",
        size === "sm" ? "text-xl md:text-2xl" : "text-4xl md:text-8xl"
      )}
    >
      SGMN.DEV
    </span>
  );

  const content = withBackground ? (
    <div className="relative overflow-hidden rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 transition-all duration-300 hover:scale-[1.02] px-4 py-2">
      {text}
    </div>
  ) : (
    text
  );

  return size === "lg" ? (
    content
  ) : (
    <Link href="/" className="relative">
      {content}
    </Link>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
