import { NavProfile } from '@dream/server-state/auth/ui';
import { ProjectTitle } from '@dream/server-state/project/ui';
import React from 'react';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-gray-900">
      <header className="flex h-14 items-center justify-between px-4">
        <div>
          <ProjectTitle />
        </div>

        <div>
          <NavProfile />
        </div>
      </header>
      <div className="flex h-[calc(100%-3.5rem)] w-full rounded-t-3xl overflow-hidden bg-gray-800">
        {children}
      </div>
    </div>
  );
}
