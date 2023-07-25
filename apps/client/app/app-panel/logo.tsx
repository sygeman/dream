import React from 'react';
import Link from 'next/link';

export const Logo = () => (
  <Link
    className="flex items-center justify-center w-12 h-12 p-2 cursor-pointer relative"
    href="/"
  >
    <div className="bg-surface w-6 h-6 rounded-md flex items-center justify-center">
      D
    </div>
  </Link>
);
