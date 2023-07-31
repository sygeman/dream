import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  title: string;
  selected: boolean;
  link: string;
};

export const ItemLink = ({ title, selected = false, link }: Props) => (
  <div>
    <Link
      href={link}
      passHref
      className={clsx(
        'btn w-full justify-start my-0.5',
        selected ? 'bg-surface text-white' : 'text-accent',
      )}
    >
      {title}
    </Link>
  </div>
);
