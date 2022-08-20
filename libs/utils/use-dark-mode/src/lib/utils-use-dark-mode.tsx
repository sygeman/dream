import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const systemDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const darkModeFromLS = localStorage.getItem('darkMode');

    if (typeof darkModeFromLS === 'undefined') {
      setDarkMode(systemDarkMode);
    } else {
      setDarkMode(darkModeFromLS === 'true');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      window.document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      window.document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};
