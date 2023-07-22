import { type ElementType } from 'react';
import clsx from 'clsx';

type Props = {
  Icon: ElementType;
  label: string;
};

export const MenuItem = ({ Icon, label }: Props) => (
  <div
    className={clsx(
      'w-full flex justify-between items-center',
      'text-white text-sm font-medium',
      'px-2 h-8 rounded hover:bg-surface-light cursor-pointer ',
    )}
  >
    {label}
    <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
  </div>
);
