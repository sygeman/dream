'use client';

import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Link from 'next/link';
import React from 'react';

type Properties = {
  title: string;
  name: string;
  online: number;
};

export const CommunityCard = ({ title, name, online }: Properties) => (
  <Link href={`/${name}`}>
    <div className="flex flex-col shrink-0 overflow-hidden items-center justify-center cursor-pointer hover:opacity-90 bg-background m-4 rounded-lg">
      <AspectRatio
        ratio={16 / 9}
        className="flex justify-center items-center bg-muted"
      >
        <div className="absolute h-full w-full flex justify-center items-center text-center overflow-hidden text-foreground opacity-25 text-3xl">
          {title}
        </div>
      </AspectRatio>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <span className="text-foreground">{title}</span>
      </div>
    </div>
  </Link>
);
