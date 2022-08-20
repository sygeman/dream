import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useDarkMode } from '@dream/utils/use-dark-mode';

export const DarkModeToggleButton = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className="text-slate-700 dark:text-slate-500 text-sm"
      onClick={toggleDarkMode}
    >
      <span>
        {!darkMode ? <MoonIcon className="h-5" /> : <SunIcon className="h-5" />}
      </span>
    </button>
  );
};
