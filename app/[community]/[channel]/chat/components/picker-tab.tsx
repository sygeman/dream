import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

type Properties = { selected: boolean } & PropsWithChildren;

export const PickerTab = ({ selected, children }: Properties) => (
  <div
    className={clsx(
      'text-sm mx-1 my-1.5 px-2 rounded font-medium',
      selected && 'bg-zinc-900-light'
    )}
  >
    {children}
  </div>
);
