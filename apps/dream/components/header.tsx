import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MenuIcon } from '@heroicons/react/outline';
import { DarkModeToggleButton } from './dark-mode-toggle-button';
import { Logo } from './logo';

export const Header = ({ toggleMenu }) => {
  return (
    <div
      className={clsx(
        'flex items-center absolute top-0 left-0 h-12 w-full',
        'px-4 justify-between'
      )}
    >
      <motion.div
        initial={{ marginLeft: -200 }}
        animate={{ marginLeft: 0 }}
        className="flex items-center"
      >
        <button onClick={toggleMenu}>
          <MenuIcon className="h-5 text-black dark:text-slate-500 mr-4" />
        </button>
        <Link href="/" passHref>
          <a href="replace">
            <Logo />
          </a>
        </Link>
      </motion.div>
      <DarkModeToggleButton />
    </div>
  );
};
