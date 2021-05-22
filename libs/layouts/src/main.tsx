import React from 'react';
import { AppPanel } from '@dream/app-panel';
import { Modals } from './modals';

export const MainLayout: React.FC = ({ children }) => (
  <div className="h-screen bg-background flex">
    <AppPanel />
    <div className="flex flex-1 h-full overflow-hidden rounded-l-xl">
      {children}
    </div>
    <Modals />
  </div>
);
