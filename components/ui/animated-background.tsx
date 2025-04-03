export function AnimatedBackground() {
  return (
    <div className="fixed inset-0">
      {/* Основной градиент */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40 opacity-70 dark:opacity-60 mix-blend-overlay animate-color-pulse transition-[background-image,opacity] duration-300 will-change-[background-image,opacity]" />

      {/* Дополнительные градиенты */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/20 via-transparent to-transparent dark:from-cyan-900/20 animate-gradient transition-[background-image] duration-300 will-change-[background-image]" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-indigo-100/20 via-transparent to-transparent dark:from-indigo-900/20 animate-gradient transition-[background-image] duration-300 will-change-[background-image]"
        style={{ animationDelay: "-3s" }}
      />

      {/* Виньетка */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] transition-[background-image] duration-300 will-change-[background-image]" />

      {/* Анимированные линии */}
      <div className="absolute w-full h-full">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-black/5 dark:bg-white/10 w-[1px] md:w-[2px] h-[10vh] md:h-[20vh] animate-pulse-custom transition-colors duration-300 will-change-[background-color]"
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
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full bg-black/30 dark:bg-white/40 blur-[1px] animate-float transition-colors duration-300 will-change-[background-color]"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
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
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-black/40 dark:bg-white/50 animate-sparkle transition-colors duration-300 will-change-[background-color]"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * -2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
