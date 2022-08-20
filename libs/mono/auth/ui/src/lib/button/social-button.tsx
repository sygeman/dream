import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const SocialButton = ({ provider, className }) => {
  const { asPath } = useRouter();

  return (
    <Link
      href={`/api/auth/${provider}?continue=${asPath.replace(
        'authModal=1',
        ''
      )}`}
    >
      <button className={clsx('btn-social', className)}>
        <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
          Login with {provider}
        </span>
      </button>
    </Link>
  );
};
