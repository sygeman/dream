import clsx from 'clsx';
import React, { useState } from 'react';
import { HomeIcon } from '@heroicons/react/20/solid';
import { AuthModal } from '../components/auth';
import { Follows } from '../components/follows';
import { CreateClipModal } from '../components/clip/create-modal';
import { ClipModal } from '../components/clip/modal';
import { LeftMenuItem } from './left-menu-item';
import { UserBox } from './user';
import { Logo } from './logo';
import { useAccess } from '../utils/use-access';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [{ allow: isUser }] = useAccess();

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-background/95">
        <ClipModal />
        <CreateClipModal />
        <AuthModal />
        <div className="relative w-full h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            <div className="h-full flex">
              <div
                className={clsx(
                  'w-[240px] flex flex-col absolute top-0 h-full z-[100] transition-all delay-150 bg-surface',
                  leftMenuIsOpen ? 'left-0' : 'left-[-240px] sm:left-0'
                )}
              >
                <div className="flex flex-col w-full flex-1">
                  <Logo />
                  <LeftMenuItem
                    route="/"
                    equal
                    icon={<HomeIcon className="h-4" />}
                    title="Главная"
                  />
                  {isUser && <Follows />}
                </div>

                <UserBox />
              </div>
              <div
                id="layoutContent"
                className={clsx(
                  'flex flex-col w-full transition-all delay-150 sm:pl-[240px]'
                )}
              >
                {children}
              </div>
            </div>
            <div
              className={clsx(
                'absolute left-0 top-0 w-full h-full z-50 bg-background/95 transition-all delay-150',
                leftMenuIsOpen ? 'sm:hidden' : 'hidden'
              )}
              onClick={() => setLeftMenuIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
