import React from 'react';
import clsx from 'clsx';

interface AppPanelMenuItemProps {
  label: string;
  img: string | null;
  selected: boolean;
}

export const AppPanelMenuItem: React.FC<AppPanelMenuItemProps> = ({
  label,
  img,
  selected = false,
}) => (
  <div
    className={clsx(
      'group relative',
      'flex shrink-0 items-center justify-center',
      'w-12 h-12 cursor-pointer',
    )}
  >
    <div
      className={clsx(
        'absolute left-0 border-l h-4',
        'border-transparent group-hover:border-accent',
        selected && 'border-accent h-6',
      )}
    ></div>
    <div
      className={clsx(
        'rounded-full h-8 w-8 flex items-center justify-center',
        !img && 'bg-surface',
      )}
    >
      {img ? (
        <img src={img} className="h-full" alt={label} />
      ) : (
        <span className="text-accent text-sm">{label?.[0]}</span>
      )}
    </div>
  </div>
);
