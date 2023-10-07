import { UsersIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

type Properties = {
  onClose: () => void;
};

export const Users = ({ onClose }: Properties) => {
  const [usersFilter, setUsersFilter] = useState('');

  // const { channelId } = useCommunityChannel();
  // const channelUsersOnlineQuery = useChannelUsersOnlineQuery({
  //   variables: { channelId },
  //   fetchPolicy: 'network-only',
  // });

  // const channelUsersOnline =
  //   channelUsersOnlineQuery?.data?.channelUsersOnline || [];

  // const usersOnline = channelUsersOnline.filter((u) =>
  //   !usersFilter ? true : u?.name.search(new RegExp(usersFilter, 'i')) >= 0,
  // );

  const usersOnline: any[] = [];

  // prisma.user.findMany({
  //   where: {
  //     connection: {
  //       some: {
  //         channelId,
  //       },
  //     },
  //   },
  // });

  return (
    <div>
      <div className="flex shrink-0 w-full text-white h-10 px-4 items-center justify-between">
        <UsersIcon className="text-muted-foreground h-3.5" />
        <span className="text-muted-foreground text-sm">Users</span>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded hover:bg-zinc-900-light flex items-center justify-center"
        >
          <XMarkIcon
            className="w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
        </button>
      </div>
      <div>
        <div className="p-2 w-full">
          <input
            placeholder="Find user online"
            className="bg-background text-muted-foreground text-sm focus:outline-none focus:ring-1 rounded p-1 px-2 w-full"
            onChange={(event) => setUsersFilter(event?.target?.value)}
          />
        </div>
        {/* {!channelUsersOnlineQuery.loading && usersOnline.length === 0 && (
          <div className="px-3 py-2 text-muted-foreground text-sm">Users not found</div>
        )} */}
        {usersOnline.map((user) => (
          <div key={user?.id} className="flex items-center px-3 py-1">
            <div className="h-5 w-5 rounded-full overflow-hidden bg-background">
              {user?.avatar && (
                <img src={user?.avatar} className="h-full w-full" />
              )}
            </div>
            <div className="text-xs font-medium ml-2 text-muted-foreground">
              {user?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
