import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { shortNumbers } from '@dream/pepega/utils-old';

interface IProps {
  media?: ReactNode;
  avatar?: string;
  title?: string;
  description?: string;
  descriptionLink?: string;
  overlay?: ReactNode;
  count?: number;
  countIcon?: ReactNode;
}

export const CardMedia: FC<IProps> = ({ media, title, overlay, count = 0 }) => (
  <div className="flex flex-col items-center rounded overflow-hidden relative">
    <div className="relative w-full aspect-w-16 aspect-h-9 bg-background">
      {media}
    </div>
    <div className="flex bg-surface w-full h-12 px-1 text-sm">
      <div className="flex flex-1 h-full items-center px-2">
        <div className="truncate w-full">{title}</div>
      </div>
      <div className="flex justify-center items-center h-full px-2">
        <span
          className={clsx(
            'text-white/75 px-2 py-1 rounded font-medium',
            count > 0 ? 'bg-twitch' : 'bg-background'
          )}
        >
          {shortNumbers(count)}
        </span>
      </div>
    </div>
    {overlay && (
      <div className="absolute top-0 left-0 w-full h-full bg-surface">
        {overlay}
      </div>
    )}
  </div>
);
