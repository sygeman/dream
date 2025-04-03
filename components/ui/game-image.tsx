import Image from "next/image";

interface GameImageProps {
  src: string;
  alt: string;
}

export function GameImage({ src, alt }: GameImageProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/40 dark:to-purple-500/40 transition-colors duration-300" />
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
