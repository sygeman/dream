import React from 'react';
import Link from 'next/link';
import { CommunityIcon } from '@dream/icons/community';

const CommunityInAppPanel: React.FC<{ path: string; name: string }> = ({
  path,
  name,
}) => {
  return (
    <Link href={`/${path}`}>
      <div className="flex flex-shrink-0 items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90">
        <div className="rounded-full bg-background h-32px w-32px flex items-center justify-center">
          <span className="text-gray-400 text-sm">{name[0]}</span>
        </div>
      </div>
    </Link>
  );
};

const AppPanel = () => {
  return (
    <div className="h-screen flex flex-col w-48px bg-surface border-r border-background overflow-hidden">
      <Link href="/">
        <div className="flex items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90">
          <div className="flex justify-center items-center h-32px w-32px">
            <span className="text-text">D</span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto">
          {[...Array(50).keys()].map((k) => (
            <CommunityInAppPanel
              key={k}
              path={`community-${k}`}
              name={`${k}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center py-2">
        <CommunityIcon />
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto">
          {[...Array(50).keys()].map((k) => (
            <CommunityInAppPanel
              key={k}
              path={`community-${k}`}
              name={`${k}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-48px h-48px bg-surface border-t border-background">
        <div className="rounded-full bg-background h-32px w-32px"></div>
      </div>
    </div>
  );
};

export const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="h-screen bg-background flex">
      <AppPanel />
      {children}
    </div>
  );
};
