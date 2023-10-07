import Link from 'next/link';
import React from 'react';

export const Logo = () => (
  <Link
    className="flex items-center justify-center w-12 h-12 p-2 cursor-pointer relative"
    href="/"
  >
    <div className="bg-zinc-900 w-6 h-6 rounded-md flex items-center justify-center">
      D
    </div>
  </Link>
);
