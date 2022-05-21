import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SocialButton = ({ provider, icon, className }) => {
  const { asPath } = useRouter();

  return (
    <Link
      href={`/api/auth/${provider}?continue=${asPath.replace(
        'authModal=1',
        ''
      )}`}
    >
      <button className={clsx('btn-social', className)}>
        <FontAwesomeIcon
          icon={icon}
          className="text-white mr-2 h-6 opacity-90"
        />

        <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
          Login with {provider}
        </span>
      </button>
    </Link>
  );
};
