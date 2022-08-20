import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Header } from '../components/header';
import { LeftPanel } from '../components/left-panel';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ paddingTop: 0, paddingLeft: 0 }}
        animate={{ paddingTop: 48, paddingLeft: menuIsOpen ? 240 : 0 }}
        className={clsx(
          'absolute h-screen w-full',
          'bg-gray-300 dark:bg-slate-900 transition-colors'
        )}
      >
        <Header toggleMenu={() => setMenuIsOpen(!menuIsOpen)} />
        <motion.div
          initial={{ left: -240 }}
          animate={{ left: menuIsOpen ? 0 : -240 }}
          className={clsx('absolute w-60', 'dark:text-white')}
        >
          <LeftPanel />
        </motion.div>
        <div className="h-full overflow-hidden bg-white dark:bg-slate-800 dark:text-white rounded-t-xl">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
