import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons';

const SocialButton = ({ provider, icon, className }) => {
  const router = useRouter();
  const origin = window?.location?.origin || '';
  const continuePath = router.query.continue || '/';

  const params = new URLSearchParams();
  params.set('code_handler', `${origin}/auth/success?`);
  params.set('redirect_uri', `${origin}${continuePath}`);
  const authUrl = `https://api.sgmn.dev/auth/${provider}?${params.toString()}`;

  return (
    <Link href={authUrl}>
      <button className={clsx('btn-social', className)}>
        <div className="absolute">
          <FontAwesomeIcon icon={icon} className="text-white mr-2 h-4" />
        </div>

        <span className="text-white opacity-80 text-sm uppercase tracking-widest mx-5 text-center w-full">
          {provider}
        </span>
      </button>
    </Link>
  );
};

export const Auth = () => {
  return (
    <div className="flex flex-col px-4 py-2 w-80">
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
