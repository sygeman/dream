import Link from 'next/link';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useFollowsQuery } from './follows.api';

export function Follows() {
  const followsQuery = useFollowsQuery();
  const channels = followsQuery?.data?.follows || [];

  return (
    <div className="flex flex-1 w-full">
      <OverlayScrollbarsComponent className="w-full text-sm font-medium">
        {channels.map((channel) => (
          <Link
            key={channel.id}
            href={`/${channel.id}`}
            passHref
            className="flex w-full h-10 items-center hover:bg-background"
          >
            <img
              className="h-6 w-6 mx-4 rounded-full"
              src={channel.profile_image_url}
              alt=""
            />

            <div>{channel.display_name}</div>
          </Link>
        ))}
      </OverlayScrollbarsComponent>
    </div>
  );
}
