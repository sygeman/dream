import cn from 'clsx';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

type Properties = {
  title: string;
  selected: boolean;
  link: string;
};

export const ItemLink = ({ title, selected = false, link }: Properties) => (
  <Link href={link} passHref>
    <Button
      variant="ghost"
      size="sm"
      className={cn('w-full justify-start', selected && 'bg-accent')}
    >
      {title}
    </Button>
  </Link>
);
