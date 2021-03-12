import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { UserGroupIcon } from '@dream/icons/user-group';
import { HeartIcon } from '@dream/icons/heart';
import { UserPanel } from '@dream/user';
import { AppPanelCommunities } from '@dream/community';

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-center w-12 h-12 cursor-pointer">
        <div className="flex justify-center items-center h-8 w-8">
          <span className="text-white">D</span>
        </div>
      </div>
    </Link>
  );
};

// const Friends = () => {
//   return (
//     <>
//       <div className="flex justify-center py-2">
//         <UserGroupIcon />
//       </div>
//       <div className="flex flex-1 w-full overflow-hidden">
//         <SimpleBar className="w-full">
//           {[...Array(50).keys()].map((k) => (
//             <CommunityInAppPanel key={k} name={`user-${k}`} title={`${k}`} />
//           ))}
//         </SimpleBar>
//       </div>
//     </>
//   );
// };

export const AppPanel = () => {
  return (
    <div className="h-screen flex flex-col flex-shrink-0 min-w-12 bg-gray-800 border-r border-gray-900 overflow-hidden">
      <Logo />
      <AppPanelCommunities />
      {/* <Friends /> */}
      <UserPanel />
    </div>
  );
};
