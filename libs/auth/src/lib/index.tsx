import React from 'react';
import { AuthButtonTwitch, AuthButtonSpotify } from './button';

export const Auth = () => {
  return (
    <div className="flex flex-col px-4 py-2">
      <AuthButtonTwitch />
      <AuthButtonSpotify />
    </div>
  );
};
