import React from 'react';
import { SpotifyNow } from '@dream/containers/spotify-now';

export function SpotifyNowPage() {
  return (
    <div className="h-screen bg-black flex">
      <SpotifyNow />
    </div>
  );
}

export default SpotifyNowPage;
