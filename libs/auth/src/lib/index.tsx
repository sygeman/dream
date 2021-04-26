import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons';

const SocialButton = ({ provider, icon, className }) => {
  return (
    <Link href={`/api/auth/${provider}`}>
      <button className={clsx('btn-social', className)}>
        <div className="absolute">
          <FontAwesomeIcon icon={icon} className="text-white mr-2 h-4" />
        </div>

        <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
          {provider}
        </span>
      </button>
    </Link>
  );
};

export const Auth = () => {
  return (
    <div className="flex flex-col px-4 py-2">
      <div className="text-accent text-xs w-full flex justify-center py-2">
        Auth with
      </div>

      <SocialButton
        className="btn-social-twitch"
        provider="twitch"
        icon={faTwitch}
      />
      <SocialButton
        className="btn-social-spotify"
        provider="spotify"
        icon={faSpotify}
      />
    </div>
  );
};
