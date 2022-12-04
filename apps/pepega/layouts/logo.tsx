import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => (
  <Link href="/" className="flex items-center h-10 bg-primary mb-2 px-2">
    <Image className="mx-4" width={16} height={16} src="/logo.svg" alt="" />
    <div className="text-sm tracking-wider text-white/80 font-medium">
      PepegaCom
    </div>
  </Link>
);
