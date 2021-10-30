import React from 'react';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SocialButton = ({ provider, icon, className }) => {
  return (
    <button
      className={clsx('btn-social', className)}
      onClick={() => signIn(provider)}
    >
      <FontAwesomeIcon icon={icon} className="text-white mr-2 h-6 opacity-90" />
      <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
        Login with {provider}
      </span>
    </button>
  );
};
