'use client';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

type Properties = {
  provider: string;
  className: string;
};

export const SocialButton = ({ provider, className }: Properties) => (
  <button
    onClick={() => signIn(provider)}
    className={clsx('btn-social w-full', className)}
  >
    <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
      Login with {provider}
    </span>
  </button>
);
