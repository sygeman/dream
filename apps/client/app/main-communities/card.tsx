import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  name: string;
  online: number;
};

export const CommunityCard = ({ title, name, online }: Props) => (
  <Link href={`/${name}`}>
    <div className="flex flex-col shrink-0 overflow-hidden items-center justify-center  cursor-pointer hover:opacity-90 bg-surface-light m-4 rounded">
      <div className="w-full bg-background aspect-w-16 aspect-h-9 relative">
        <div className="absolute h-full w-full flex justify-center items-center overflow-hidden text-accent opacity-25 text-3xl">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2 border-t border-surface">
        <span className="text-sm text-white">{title}</span>
        <span className="text-accent text-xs rounded bg-surface px-2 py-1">
          {online}
        </span>
      </div>
    </div>
  </Link>
);
