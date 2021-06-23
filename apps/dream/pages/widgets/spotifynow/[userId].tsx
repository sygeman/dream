import React from 'react';
import { SpotifyNow } from '@dream/spotify-now';
import { useRouter } from 'next/router';

export function SpotifyNowPage() {
  const { query } = useRouter();
  const userId = typeof query?.userId === 'string' && query?.userId;

  return (
    <div className="h-screen bg-background flex">
      <SpotifyNow userId={userId} />
    </div>
  );
}

export default SpotifyNowPage;
