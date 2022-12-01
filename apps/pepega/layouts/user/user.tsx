import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import { signOut } from 'next-auth/react';
import { Avatar } from '../../components/avatar';

export const User = () => {
  return null;

  // return (
  //   <div className="h-10 flex items-center bg-surface/50">
  //     <div className="px-4">
  //       <Avatar avatar={user.avatar} />
  //     </div>
  //     <div className="flex flex-1 items-center text-white/75 font-medium text-sm">
  //       {user.name}
  //     </div>
  //     <button
  //       className="hover:bg-background/50 p-2 mx-2 rounded-lg"
  //       onClick={() => signOut()}
  //     >
  //       <ArrowRightOnRectangleIcon className="h-4" />
  //     </button>
  //   </div>
  // );
};
