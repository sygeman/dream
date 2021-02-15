import React from 'react';
import { AppPanel } from '@dream/containers/app-panel';
import { Modals } from '@dream/containers/modals';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="h-screen bg-background flex">
        <AppPanel />
        {children}
      </div>
      <Modals />
    </>
  );
};
