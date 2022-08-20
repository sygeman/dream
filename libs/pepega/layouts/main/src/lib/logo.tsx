import Link from 'next/link';

export const Logo = () => (
  <Link href="/" passHref>
    <a href="replace" className="flex items-center h-10 bg-primary mb-2 px-2">
      <img className="h-4 w-4 mx-4 rounded" src={`/logo.svg`} alt="" />
      <div className="text-sm tracking-wider	 text-white/80 font-medium">
        PepegaCom
      </div>
    </a>
  </Link>
);
