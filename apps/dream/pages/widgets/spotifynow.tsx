import React from 'react';
import { SpotifyNow } from '@dream/spotify-now';

export function SpotifyNowPage() {
  return (
    <div className="h-screen bg-background flex">
      <SpotifyNow />
    </div>
  );
}

export default SpotifyNowPage;
