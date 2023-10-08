import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface AppPanelMenuItemProperties {
  label: string;
  img: string | null;
  selected: boolean;
}

export const AppPanelMenuItem: React.FC<AppPanelMenuItemProperties> = ({
  label,
  img,
  selected = false,
}) => (
  <div
    className={clsx(
      'group relative',
      'flex shrink-0 items-center justify-center',
      'w-12 h-12 cursor-pointer'
    )}
  >
    <div
      className={clsx(
        'absolute left-0 border-l h-4',
        'border-transparent group-hover:border-accent',
        selected && 'border-accent h-6'
      )}
    ></div>
    <div
      className={clsx(
        'rounded-full h-8 w-8 flex items-center justify-center',
        !img && 'bg-zinc-900'
      )}
    >
      {img ? (
        <Image
          width={32}
          height={32}
          src={img}
          className="h-full"
          alt={label}
        />
      ) : (
        <span className="text-muted-foreground text-sm">{label?.[0]}</span>
      )}
    </div>
  </div>
);
