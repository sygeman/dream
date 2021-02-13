import React from 'react';
import { AppPanel } from '@dream/containers/app-panel';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="h-screen bg-background flex">
      <AppPanel />
      {children}
    </div>
  );
};
