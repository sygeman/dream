import Link from 'next/link';
import { UserPanel } from '@dream/mono-user-ui';
import { AppPanelCommunities } from '@dream/mono-community-ui';

const Logo = () => (
  <Link href="/">
    <div className="flex items-center justify-center w-12 h-12 p-2 cursor-pointer relative">
      D
    </div>
  </Link>
);

export const AppPanel = () => (
  <div className="h-screen flex flex-col shrink-0 min-w-12 bg-background overflow-hidden">
    <Logo />
    <AppPanelCommunities />
    <UserPanel />
  </div>
);
