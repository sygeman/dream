import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { Button } from '../ui/button';

type Properties = {
  title: string;
  selected: boolean;
  link: string;
};

export const ItemLink = ({ title, selected = false, link }: Properties) => (
  <div>
    <Link
      href={link}
      passHref
      // className={clsx(
      //   'btn w-full justify-start my-0.5',
      //   selected ? 'bg-zinc-900 text-white' : 'text-muted-foreground'
      // )}
    >
      <Button variant="ghost" className="w-full justify-start">
        {title}
      </Button>
    </Link>
  </div>
);
