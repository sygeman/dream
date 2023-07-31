import { type PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = { selected: boolean } & PropsWithChildren;

export const PickerTab = ({ selected, children }: Props) => (
  <div
    className={clsx(
      'text-sm mx-1 my-1.5 px-2 rounded font-medium',
      selected && 'bg-surface-light',
    )}
  >
    {children}
  </div>
);
